import React from "react";
import AddLink from "@/features/links/components/add-link";
import LinksContainer from "@/features/links/components/links-container";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { loginPath } from "@/features/constants/path-constants";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(loginPath());
  }

  return (
    <div className="container mx-auto max-w-2xl space-y-4">
      <AddLink />
      <LinksContainer />
    </div>
  );
};
export default Page;
