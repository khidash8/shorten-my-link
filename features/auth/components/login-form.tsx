"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useGoogleSignIn } from "@/features/auth/hooks/use-google-sign-in";
import { homePath } from "@/features/constants/path-constants";
import { Button } from "@/components/ui/button";
import { LoaderSpinner } from "@/components/loader-spinner";

export const LoginForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const { isPending: googleSignInPending, handleGoogleSignIn } =
    useGoogleSignIn({
      redirectPath: homePath(),
      onSuccess: () => console.log("Google sign-in successful"),
      onError: () => console.log("Google sign-in failed"),
    });

  return (
    <Card
      className={cn(
        "animate-fade-in-from-top w-full max-w-md flex-1",
        className,
      )}
      {...props}
    >
      <CardHeader className="flex items-center justify-center">
        <div className="flex flex-col items-start gap-2">
          <CardTitle className="text-xl font-semibold">Welcome Back!</CardTitle>
          <CardDescription className="text-muted-foreground">
            Login with your Social account
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="">
          <Button
            variant="outline"
            className="w-full cursor-pointer"
            onClick={handleGoogleSignIn}
            disabled={googleSignInPending}
          >
            {googleSignInPending ? (
              <LoaderSpinner />
            ) : (
              <div className="flex items-center space-x-2">
                <svg
                  className="size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                <span>Google</span>
              </div>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
