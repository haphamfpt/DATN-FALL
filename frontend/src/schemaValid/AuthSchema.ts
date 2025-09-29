import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(255),
});

export const ResSchema = z
  .object({
    username: z.string().min(6),
    email: z.string().email(),
    password: z.string().min(6).max(255),
    confirmPass: z.string().min(6).max(255),
  })
  .refine((data) => data.password === data.confirmPass, {
    message: "Password and confirm pass must be the same",
    path: ["confirmPass"],
  });
