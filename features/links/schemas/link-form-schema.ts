import { z } from "zod";

export const linkFormSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
  customAlias: z
    .string()
    .min(1, "Custom alias must be at least 1 character")
    .max(50, "Custom alias must be less than 50 characters")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Custom alias can only contain letters, numbers, hyphens, and underscores",
    )
    .optional()
    .or(z.literal("")),
});

export type LinkFormSchemaType = z.infer<typeof linkFormSchema>;
