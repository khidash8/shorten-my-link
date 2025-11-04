"use client";

import React from "react";
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
import { z } from "zod";
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

const LinksForm = () => {
  const form = useForm<LinkFormSchemaType>({
    resolver: zodResolver(linkFormSchema),
    defaultValues: {
      url: "",
      customAlias: "",
    },
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  function onSubmit(values: LinkFormSchemaType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Short Link</CardTitle>
        <CardDescription>
          Shorten your long URLs and make them easier to share
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* URL Field */}
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/very-long-url-path"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Custom Alias Field */}
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
                        className="flex-1"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Create Short Link
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
export default LinksForm;
