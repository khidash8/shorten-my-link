"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { PublicLinkItem } from "@/features/public-path/components/public-link-item";
import ItemSkeleton from "@/features/links/components/item-skeleton";
import { getPublicLinks } from "@/features/public-path/actions/get-public-links-action";
import { ShortLink } from "@/features/links/types/link-types";

type SearchableLinksProps = {
  initialLinks: ShortLink[];
};

export function SearchableLinks({ initialLinks }: SearchableLinksProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery] = useDebounce(searchQuery, 500);
  const [links, setLinks] = useState<ShortLink[]>(initialLinks);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const result = await getPublicLinks(20, debouncedQuery);
      // const result = await getPublicLinks(20);
      if (result.success && result.data) {
        setLinks(result.data);
      }
    });
  }, [debouncedQuery]);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative mb-4 max-w-[450px]">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          type="text"
          placeholder="Search links by short code, or URL..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {isPending ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ItemSkeleton key={i} />
          ))}
        </div>
      ) : links.length === 0 ? (
        <div className="text-muted-foreground">
          {searchQuery
            ? "No links found matching your search."
            : "No links available yet."}
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <PublicLinkItem key={link.id} link={link} />
          ))}
        </ul>
      )}
    </div>
  );
}
