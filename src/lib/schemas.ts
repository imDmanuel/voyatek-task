import { z } from "zod";

export const userFormSchema = z.object({
  email: z
    .string({ required_error: "User email is required" })
    .email({ message: "Please enter a valid email" }),
  fullName: z
    .string({ required_error: "User full name is required" })
    .min(4, "Please enter at least 4 characters")
    .max(50, "Full name must not exceed 50 characters"),
  role: z.enum(["", "Administrator", "Sales Manager", "Sales Representative"]),
  password: z
    .string({ required_error: "Please create a password" })
    .min(6, "Password must be at least 6 characters"),
});

export type UserFormSchema = z.infer<typeof userFormSchema>;
