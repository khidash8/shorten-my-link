import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const link = await prisma.link.findUnique({
      where: { id },
    });

    if (!link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    if (link.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.link.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal server error ${error}` },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { url, customAlias } = await req.json();

    // Check if link exists and belongs to user
    const existingLink = await prisma.link.findUnique({
      where: { id },
    });

    if (!existingLink) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    if (existingLink.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    // If customAlias is provided and different from current, check if it's available
    if (customAlias && customAlias !== existingLink.customAlias) {
      const aliasExists = await prisma.link.findFirst({
        where: {
          shortCode: customAlias,
          id: { not: id },
        },
      });

      if (aliasExists) {
        return NextResponse.json(
          { error: "Custom alias already exists" },
          { status: 400 },
        );
      }
    }

    // Update link
    const updatedLink = await prisma.link.update({
      where: { id },
      data: {
        originalUrl: url,
        customAlias: customAlias || null,
        ...(customAlias && customAlias !== existingLink.customAlias
          ? { shortCode: customAlias }
          : {}),
      },
    });

    return NextResponse.json(updatedLink);
  } catch (e) {
    console.error("Error updating link:", e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
