import { getUserLinks } from "@/features/links/actions/get-user-links-action";
import { SectionCards } from "@/features/dashboard/components/section-card";
import { DashboardLinksTable } from "@/features/dashboard/components/dashboard-links-table";

export default async function Dashboard() {
  const links = await getUserLinks(true);

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold">URL Shortener Dashboard</h1>

      <SectionCards userId={links.data?.[0].userId ?? ""} />

      <DashboardLinksTable links={links.data || []} />
    </div>
  );
}
