import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { homePath } from "@/features/constants/path-constants";
import { LoginForm } from "@/features/auth/components/login-form";

const LoginPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    redirect(homePath());
  }

  return <LoginForm />;
};

export default LoginPage;
