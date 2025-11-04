"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";

type LinkItemProps = {
  link: {
    id: string;
    originalUrl: string;
    shortCode: string;
    customAlias: string | null;
    clicks: number;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  };
  onCopyAction?: (shortCode: string) => void;
};

export function LinkItem({ link, onCopyAction }: LinkItemProps) {
  const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/go/${link.shortCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    onCopyAction?.(link.shortCode);
  };

  return (
    <li className="rounded-xl border p-3">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <Link
            href={`/go/${link.shortCode}`}
            target="_blank"
            className="hover:text-muted-foreground underline-offset-4 hover:underline"
          >
            {shortUrl}
          </Link>
          <Badge>{link.clicks} clicks</Badge>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-muted-foreground text-xs">
            Created: {new Date(link.createdAt).toLocaleDateString()}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer rounded-xl"
            onClick={handleCopy}
          >
            <CopyIcon />
          </Button>
        </div>
      </div>
    </li>
  );
}
