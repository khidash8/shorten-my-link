import React, { Suspense } from "react";
import Link from "next/link";
import { LoaderSpinner } from "@/components/loader-spinner";
import { getUserLinks } from "@/features/links/actions/get-user-links-action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import { LinkItem } from "@/features/links/components/link-item";

const LinksContainer = () => {
  return (
    <div className={"flex flex-col justify-start gap-4"}>
      <h2 className="text-2xl font-bold">Recent Links</h2>
      <Suspense fallback={<LoaderSpinner />}>
        <RenderLinks />
      </Suspense>
    </div>
  );
};
export default LinksContainer;

const RenderLinks = async () => {
  const result = await getUserLinks();

  if (!result.success) {
    return (
      <div className="text-red-500">Failed to load links: {result.error}</div>
    );
  }

  const links = result.data;

  if (!links || links.length === 0) {
    return (
      <div className="text-muted-foreground">
        No links created yet. Create your first short link!
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {links.map((link) => (
        <LinkItem key={link.id} link={link} />
      ))}
    </ul>
  );
};
