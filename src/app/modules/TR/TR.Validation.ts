import z from "zod";

const createTRValidationSchema = z.object({
    TRID: z
        .number()
        .min(1, { message: "TRID is required" }),

    shopName: z
        .string()
        .min(1, { message: "ShopId is required" }),

    quantity: z
        .number(),

    paymentStatus: z.boolean(),

    taka: z
        .number()
        .min(0, { message: "taka cannot be negative" }),

    bookingDate: z.coerce.date(),

    isOfficeDelivery: z.boolean(),

    note: z
        .string()
        .max(500, { message: "Note cannot exceed 500 characters" })
        .optional(),
});

const createMultipleTRValidationSchema = z.array(createTRValidationSchema)

const updateTRValidationSchema = z.object({
    TRID: z
        .string()
        .min(1, { message: "TRID is required" })
        .optional(),

    shopName: z
        .string()
        .min(1, { message: "ShopId is required" })
        .optional(),

    Quantity: z
        .string()
        .optional(),

    paymentStatus: z.boolean().optional(),

    taka: z
        .number()
        .min(0, { message: "taka cannot be negative" })
        .optional(),

    bookingDate: z.coerce.date().optional(),

    isOfficeDelivery: z.boolean().optional(),

    Note: z
        .string()
        .max(500, { message: "Note cannot exceed 500 characters" })
        .optional(),
}).refine(
    (data) => Object.values(data).some((v) => v !== undefined),
    {
        message: "Please at least one field must be provided for update",
    }
)

export const TRValidationSchema = {
    createTRValidationSchema,
    updateTRValidationSchema,
    createMultipleTRValidationSchema
}