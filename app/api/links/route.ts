import { RateLimiterMemory } from "rate-limiter-flexible";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { generateShortCode } from "@/lib/generate-random";
import prisma from "@/lib/db";

const rateLimiter = new RateLimiterMemory({
  points: 100,
  duration: 86400, // 1 day
});

async function getRateLimitKey(req: Request): Promise<string> {
  const session = await auth.api.getSession({ headers: req.headers });
  if (session?.user?.id) {
    return session.user.id;
  }

  // Fallback to IP if available (NextRequest has ip property)
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : req.headers.get("x-real-ip");

  return ip || "anonymous";
}

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // rate limit
    try {
      const key = await getRateLimitKey(req);
      await rateLimiter.consume(key);
    } catch {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429 },
      );
    }

    // get data from request
    const { url, customAlias } = await req.json();

    //   validate url
    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    // create short url
    const shortCode = customAlias || generateShortCode();

    // check if custom alias already exists
    if (customAlias) {
      const existingLink = await prisma.link.findFirst({
        where: {
          shortCode: customAlias,
        },
      });

      if (existingLink) {
        return NextResponse.json(
          { error: "Custom alias already exists" },
          { status: 400 },
        );
      }
    }

    // Create Link
    const link = await prisma.link.create({
      data: {
        originalUrl: url,
        shortCode,
        customAlias,
        userId: session.user.id,
      },
    });

    return NextResponse.json(link);
  } catch (e) {
    console.error("Error creating link:", e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
