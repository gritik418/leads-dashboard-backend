import z from "zod";

const LoginSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(20, "Password can't exceed 20 characters."),
});

export default LoginSchema;
