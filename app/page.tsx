import PublicLinksContainer from "@/features/public-path/components/public-links-ontainer";

export const dynamic = "force-dynamic";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className={"text-2xl font-bold"}>Home</h1>
      <PublicLinksContainer />
    </div>
  );
};

export default HomePage;
