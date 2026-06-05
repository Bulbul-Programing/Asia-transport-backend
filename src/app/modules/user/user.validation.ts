import z from 'zod';

const createUserSchema = z.object({
    name: z.string()
        .trim()
        .min(2, "Name must be at least 2 characters long")
        .max(100, "Name cannot exceed 100 characters"),

    email: z.email()
        .trim(),
    shopName: z.string()
        .trim()
        .min(2, "Shop name must be at least 2 characters long")
        .max(100, "Shop name cannot exceed 100 characters"),
    password: z.string()
        .trim()
        .min(6, "Password must be at least 2 characters long")
        .max(20, "Password cannot exceed 100 characters"),
    role: z.enum(["ADMIN", "USER"]).default("USER"),
})

const updateUserSchema = z.object({
    name: z.string()
        .trim()
        .min(2, "Name must be at least 2 characters long")
        .max(100, "Name cannot exceed 100 characters"),

    email: z.email()
        .trim(),
    shopName: z.string()
        .trim()
        .min(2, "Shop name must be at least 2 characters long")
        .max(100, "Shop name cannot exceed 100 characters"),
    password: z.string()
        .trim()
        .min(6, "Password must be at least 2 characters long")
        .max(20, "Password cannot exceed 100 characters"),
    role: z.enum(["ADMIN", "USER"]),
}).refine((data) => Object.keys(data).length < 1 , {
    message : "Please at least one field must be provided for update"
})

export const userValidationSchema = {
    createUserSchema,
    updateUserSchema
}