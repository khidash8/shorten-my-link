import { ThemeToggle } from "@/components/theme/mode-toggle";
import LinksContainer from "@/features/links/components/links-container";
import AddLink from "@/features/links/components/add-link";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 p-8">
        <h1 className="text-3xl font-bold">HomePage</h1>
        <ThemeToggle />
      </div>

      {/* Main content */}
      <div className="container mx-auto max-w-2xl space-y-4">
        <AddLink />
        <LinksContainer />
      </div>
    </div>
  );
};

export default HomePage;
