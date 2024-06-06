import { z } from "zod";

const SignUp = z
  .object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    username: z.string().min(8),
    email: z.string().email(),
    password: z.string().min(8),
    checkPassword: z.string().min(8),
  })
  .required()
  .refine((data) => data.password === data.checkPassword, {
    message: "Passwords do not Match",
    path: ["checkPassword"],
  });
