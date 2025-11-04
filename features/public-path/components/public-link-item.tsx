"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ShortLink } from "@/features/links/types/link-types";
import { dateOptions } from "@/lib/intl-converter";

type PublicLinkItemProps = {
  link: ShortLink;
  onCopyAction?: (shortCode: string) => void;
};

export function PublicLinkItem({ link, onCopyAction }: PublicLinkItemProps) {
  const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/go/${link.shortCode}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    onCopyAction?.(link.shortCode);
    setCopied(true);
    toast.success("Link copied to clipboard");
    setTimeout(() => {
      setCopied(false);
    }, 3000);
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

          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer rounded-xl"
            onClick={handleCopy}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-xs">
            Created:{" "}
            {new Date(link.createdAt).toLocaleString("en-IN", dateOptions)}
          </span>
        </div>
      </div>
    </li>
  );
}
