import React from "react";
import { CardTitle } from "@/components/ui/card";
import { ArrowLeft, LucideBookOpenText } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  homePath,
  privacyPath,
  termsPath,
} from "@/features/constants/path-constants";
import Image from "next/image";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      {/* Back button */}
      <Link
        href={homePath()}
        className={buttonVariants({
          variant: "outline",
          className: "absolute top-6 left-6 cursor-pointer",
        })}
      >
        <ArrowLeft className="size-4" />
        Back
      </Link>

      {/* Heder */}
      <div className="flex w-full items-center justify-center rounded-md">
        <Link href="/" className="flex items-center gap-2 font-medium">
          <Image src={"./Logo.svg"} alt={"logo"} width={28} height={28} />
          <CardTitle className="text-xl font-semibold">
            Shorten My URL
          </CardTitle>
          <span className="sr-only">Shorten My URL</span>
        </Link>
      </div>

      <div className="w-full max-w-sm">{children}</div>

      {/* Footer */}
      <div className="text-muted-foreground *:[a]:hover:text-primary mt-6 text-center text-sm text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <Link href={termsPath()}>Terms of Service</Link> and{" "}
        <Link href={privacyPath()}>Privacy Policy</Link>.
      </div>
    </div>
  );
}
