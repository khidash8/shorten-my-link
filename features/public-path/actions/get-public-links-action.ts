"use server";

import prisma from "@/lib/db";

export async function getPublicLinks(limit: number = 5) {
  try {
    const links = await prisma.link.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    return { success: true, data: links };
  } catch (error) {
    console.error("Failed to fetch public links:", error);
    return { success: false, error: "Failed to fetch links" };
  }
}
