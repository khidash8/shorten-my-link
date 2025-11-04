"use client";

import React, { useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  linkFormSchema,
  LinkFormSchemaType,
} from "@/features/links/schemas/link-form-schema";
import { toast } from "sonner";
import { baseUrl } from "@/features/constants/path-constants";
import { LoaderSpinner } from "@/components/loader-spinner";
import { useRouter } from "next/navigation";

type LinksFormProps = {
  mode?: "create" | "edit";
  existingLink?: {
    id: string;
    originalUrl: string;
    customAlias: string | null;
  };
  onSuccess?: () => void;
};

const LinksForm = ({
  mode = "create",
  existingLink,
  onSuccess,
}: LinksFormProps) => {
  const form = useForm<LinkFormSchemaType>({
    resolver: zodResolver(linkFormSchema),
    defaultValues: {
      url: existingLink?.originalUrl || "",
      customAlias: existingLink?.customAlias || "",
    },
  });

  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit = (values: LinkFormSchemaType) => {
    startTransition(async () => {
      try {
        const endpoint =
          mode === "edit" ? `/api/links/${existingLink?.id}` : "/api/links";
        const method = mode === "edit" ? "PATCH" : "POST";

        const response = await fetch(endpoint, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: values.url,
            customAlias: values.customAlias || undefined,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.error || "Something went wrong");
        } else {
          form.reset();
          router.refresh();
          toast.success(
            mode === "edit"
              ? "Link updated successfully"
              : "Link created successfully",
          );
          onSuccess?.();
        }
      } catch {
        toast.error("Network error");
      }
    });
  };

  return (
    <Card>
      {mode === "create" && (
        <CardHeader>
          <CardTitle>Create Short Link</CardTitle>
          <CardDescription>
            Shorten your long URLs and make them easier to share
          </CardDescription>
        </CardHeader>
      )}
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/your-url-path"
                      {...field}
                      disabled={pending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customAlias"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom Alias (Optional)</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm whitespace-nowrap text-gray-500">
                        {baseUrl}/go/
                      </span>
                      <Input
                        placeholder="my-custom-link"
                        {...field}
                        disabled={pending}
                        className="flex-1"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? (
                <LoaderSpinner
                  label={mode === "edit" ? "Updating..." : "Creating..."}
                />
              ) : mode === "edit" ? (
                "Update Link"
              ) : (
                "Create Short Link"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
export default LinksForm;
