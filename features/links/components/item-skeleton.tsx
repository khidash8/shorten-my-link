import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ItemSkeleton = () => {
  return (
    <div className="rounded-xl border p-3">
      <div className="flex flex-col gap-2">
        {/* First row: URL and clicks badge */}
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-5 w-48" /> {/* URL text */}
          <Skeleton className="h-5 w-16" /> {/* Clicks badge */}
        </div>

        {/* Second row: Date and copy button */}
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-3 w-32" /> {/* Date text */}
          <Skeleton className="h-8 w-8 rounded-xl" /> {/* Copy button */}
        </div>
      </div>
    </div>
  );
};

export default ItemSkeleton;
