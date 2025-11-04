import React from "react";
import { ThemeToggle } from "@/components/theme/mode-toggle";
import LinksContainer from "@/features/links/components/links-container";
import LinksForm from "@/features/links/components/links-form";

const HomePage = () => {
  return (
    <div className={"flex flex-col gap-4"}>
      <div className="flex items-center justify-between gap-2 p-8">
        <h1>HomePage</h1>
        <ThemeToggle />
      </div>

      <div className={"container mx-auto max-w-2xl space-y-4"}>
        <LinksForm />

        <LinksContainer />
      </div>
    </div>
  );
};
export default HomePage;
