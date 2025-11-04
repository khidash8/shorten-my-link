import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { headers } from "next/headers";

type Props = {
  params: Promise<{
    code: string;
  }>;
};

const RedirectPage = async ({ params }: Props) => {
  const { code } = await params;

  const headersList = await headers();

  // Get IP from headers
  const forwarded = headersList.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : headersList.get("x-real-ip");

  const link = await prisma.link.findUnique({
    where: { shortCode: code },
  });

  if (!link) {
    redirect("/");
  }

  // Create analytics (without IP for now)
  await prisma.analytics.create({
    data: {
      linkId: link.id,
      userAgent: headersList.get("user-agent") || undefined,
      ipAddress: ip,
    },
  });

  // Increment clicks
  await prisma.link.update({
    where: { id: link.id },
    data: { clicks: { increment: 1 } },
  });

  // Redirect to the original URL
  redirect(link.originalUrl);
};

export default RedirectPage;
