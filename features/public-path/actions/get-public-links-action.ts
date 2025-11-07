"use server";

import prisma from "@/lib/db";

export async function getPublicLinks(limit: number = 5, searchQuery?: string) {
  try {
    const links = await prisma.link.findMany({
      where: searchQuery
        ? {
            OR: [
              { shortCode: { contains: searchQuery, mode: "insensitive" } },
              { originalUrl: { contains: searchQuery, mode: "insensitive" } },
            ],
          }
        : undefined,
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
