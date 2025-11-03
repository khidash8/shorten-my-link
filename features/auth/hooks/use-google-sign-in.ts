import { authClient } from "@/lib/auth-client";
import { homePath } from "@/features/constants/path-constants";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UseGoogleSignInOptions {
  onSuccess?: () => void;
  onError?: () => void;
  redirectPath?: string;
}

export const useGoogleSignIn = (options: UseGoogleSignInOptions = {}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const { onSuccess, onError, redirectPath = homePath() } = options;

  const handleGoogleSignIn = () => {
    startTransition(async () => {
      try {
        await authClient.signIn.social({
          provider: "google",
          callbackURL: redirectPath,
          fetchOptions: {
            onSuccess: () => {
              toast.success("Please be patient, Logging in...");
              onSuccess?.();
              router.push(redirectPath);
            },
            onError: () => {
              toast.error("Failed to sign in with Google");
              onError?.();
            },
          },
        });
      } catch {
        toast.error("An unexpected error occurred during Google sign-in");
        onError?.();
      }
    });
  };

  return {
    isPending,
    handleGoogleSignIn,
  };
};
