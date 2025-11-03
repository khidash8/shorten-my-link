import React from "react";
import { ThemeToggle } from "@/components/theme/mode-toggle";

const HomePage = () => {
  return (
    <div className="flex items-center justify-between gap-2 p-8">
      <h1>HomePage</h1>
      <ThemeToggle />
    </div>
  );
};
export default HomePage;
