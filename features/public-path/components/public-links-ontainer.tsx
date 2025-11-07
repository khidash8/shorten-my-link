import React, { Suspense } from "react";
import ItemSkeleton from "@/features/links/components/item-skeleton";
import { getPublicLinks } from "@/features/public-path/actions/get-public-links-action";
import { SearchableLinks } from "@/features/public-path/components/searchable-links";

const PublicLinksContainer = () => {
  return (
    <div className="flex flex-col justify-start gap-4">
      <h2 className="text-2xl font-bold">Recent Links</h2>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ItemSkeleton key={i} />
            ))}
          </div>
        }
      >
        <RenderPublicLinks />
      </Suspense>
    </div>
  );
};

export default PublicLinksContainer;

const RenderPublicLinks = async () => {
  const result = await getPublicLinks(20);

  if (!result.success) {
    return (
      <div className="text-red-500">Failed to load links: {result.error}</div>
    );
  }

  const links = result.data || [];

  if (!links || links.length === 0) {
    return <div className="text-muted-foreground">No links available yet.</div>;
  }

  return <SearchableLinks initialLinks={links} />;
};
