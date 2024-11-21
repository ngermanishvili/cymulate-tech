import { z } from "zod";

export const userSchema = {
    firstName: z.string()
        .min(2, "First name must be at least 2 characters")
        .refine(val => !/\s/.test(val), "First name cannot contain spaces"),

    lastName: z.string()
        .min(2, "Last name must be at least 2 characters")
        .refine(val => !/\s/.test(val), "Last name cannot contain spaces"),

    email: z.string()
        .email("Invalid email address")
        .min(1, "Email is required"),

    password: z.string()
        .min(6, "Password must be at least 6 characters")
    // .regex(/[A-Z]/, "Password must contain at least one uppercase letter") //?
    // .regex(/[0-9]/, "Password must contain at least one number") //?
};

export const loginSchema = z.object({
    email: userSchema.email,
    password: userSchema.password,
});

export const registerSchema = z.object({
    firstName: userSchema.firstName,
    lastName: userSchema.lastName,
    email: userSchema.email,
    password: userSchema.password,
});

export type ValidationErrors = {
    [key: string]: string | undefined;
};

export const validateForm = <T>(schema: z.ZodSchema<T>, data: T): ValidationErrors => {
    try {
        schema.parse(data);
        return {};
    } catch (error) {
        if (error instanceof z.ZodError) {
            return error.errors.reduce((acc, curr) => {
                const key = curr.path[0] as string;
                acc[key] = curr.message;
                return acc;
            }, {} as ValidationErrors);
        }
        return {};
    }
};