import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideLink, User } from "lucide-react";
import prisma from "@/lib/db";

export async function SectionCards({ userId }: { userId?: string }) {
  if (!userId) {
    return (
      <Card>
        <CardHeader>
          <CardDescription>Total Links</CardDescription>
          <CardTitle className="flex items-center gap-2 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <User className="text-muted-foreground h-6 w-6" />0
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  const totalLinks = await prisma.link.count({
    where: {
      userId,
    },
  });

  return (
    <div
      className={"mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"}
    >
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Links</CardDescription>
          <CardTitle className="flex items-center gap-2 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <LucideLink className="text-muted-foreground h-6 w-6" />
            {totalLinks}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
