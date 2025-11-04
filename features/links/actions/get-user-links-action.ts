"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/db";

export async function getUserLinks(dashboard: boolean = false) {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({ headers: headersList });

    if (!session) {
      throw new Error("Unauthorized");
    }

    const links = await prisma.link.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: !dashboard ? 5 : undefined,
    });

    return { success: true, data: links };
  } catch (error) {
    return { success: false, error: "Failed to fetch links" };
  }
}
