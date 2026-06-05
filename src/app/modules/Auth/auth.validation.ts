import z from 'zod';

const loginValidationSchema = z.object({
    email: z.email("Invalid Email Address"),
    password: z.string().min(6, "Password must be at least 6 characters").max(20, "Password must not exceed 20 characters")
})


export const authValidation = {
    loginValidationSchema
}