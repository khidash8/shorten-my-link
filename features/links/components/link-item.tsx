"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon, PencilIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { DeleteLinkDialogue } from "@/features/links/components/delete-link-dialogue";
import { EditLinkDialog } from "@/features/links/components/editLink-dialog";
import { ShortLink } from "@/features/links/types/link-types";

type LinkItemProps = {
  link: ShortLink;
  onCopyAction?: (shortCode: string) => void;
};

export function LinkItem({ link, onCopyAction }: LinkItemProps) {
  const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/go/${link.shortCode}`;
  const [copied, setCopied] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

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
          <Badge>{link.clicks} clicks</Badge>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-xs">
            Created: {new Date(link.createdAt).toLocaleDateString("en-US")}
          </span>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer rounded-xl"
              onClick={handleCopy}
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
            </Button>

            {/* Edit link */}
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer rounded-xl"
              onClick={() => setIsEditOpen(true)}
            >
              <PencilIcon />
            </Button>

            <DeleteLinkDialogue id={link.id} />
          </div>
        </div>
      </div>

      <EditLinkDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        link={link}
      />
    </li>
  );
}
