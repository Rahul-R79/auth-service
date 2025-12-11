import { z } from "zod";

export const signUpSchema = z.object({
    email: z
        .string()
        .trim()
        .nonempty("Email is required")
        .email("Please provide a valid email address"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .regex(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/,
            "Password must contain at least one uppercase letter, one number, and one special character"
        ),

    displayName: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Display name cannot exceed 50 characters")
        .trim(),
});

export const signInSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Please provide a valid email address"),

    password: z.string().min(1, "Password is required"),
});


export const refreshTokenSchema = z.object({
    refreshToken: z.string().min(1, "Refresh token is required").trim(),
});

export const validateTokenSchema = z.object({
    token: z.string().min(1, "Token is required").trim(),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
export type ValidateTokenInput = z.infer<typeof validateTokenSchema>;
