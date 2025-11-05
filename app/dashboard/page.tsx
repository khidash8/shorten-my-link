import { getUserLinks } from "@/features/links/actions/get-user-links-action";
import { SectionCards } from "@/features/dashboard/components/section-card";
import { DashboardLinksTable } from "@/features/dashboard/components/dashboard-links-table";
import { Suspense } from "react";
import { SectionCardsSkeleton } from "@/features/dashboard/components/section-cards-skeleton";
import { DashboardLinksTableSkeleton } from "@/features/dashboard/components/dashboard-links-table-skeleton";

export default async function Dashboard() {
  const links = await getUserLinks(20);

  return (
    <div className="container mx-auto p-2">
      <h1 className="mb-6 text-2xl font-bold">URL Shortener Dashboard</h1>

      <Suspense fallback={<SectionCardsSkeleton />}>
        {links.data && links.data.length > 0 && (
          <SectionCards userId={links.data?.[0].userId ?? ""} />
        )}
      </Suspense>

      <Suspense fallback={<DashboardLinksTableSkeleton />}>
        <DashboardLinksTable links={links.data || []} />
      </Suspense>
    </div>
  );
}
