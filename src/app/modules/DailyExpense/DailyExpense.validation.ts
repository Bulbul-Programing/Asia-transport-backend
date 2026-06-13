import { z } from "zod";

const optionalFloat = z
    .union([z.string(), z.number()])
    .transform((v) => (v === "" || v === null || v === undefined ? null : Number(v)))
    .refine((v) => v === null || !isNaN(v), { message: "Must be a number" })
    .nullable()
    .optional();

const requiredFloat = (label: string) =>
    z
        .union([z.string(), z.number()])
        .transform((v) => Number(v))
        .refine((v) => !isNaN(v) && v >= 0, { message: `${label} must be a non-negative number` });

// ─────────────────────────────────────────────────────────────────────────────
// DailyExpense — Create
// ─────────────────────────────────────────────────────────────────────────────
export const createDailyExpenseSchema = z.object({
    date: z
        .union([z.string(), z.date()])
        .transform((v) => (v instanceof Date ? v : new Date(v)))
        .refine((v) => !isNaN(v.getTime()), { message: "Invalid date" }),

    // required
    labourSalary: requiredFloat("Labour salary"),
    officeCost: requiredFloat("Office cost"),

    // optional
    carRent: optionalFloat,
    carNumber: optionalFloat,
    vanRepair: optionalFloat,
    mobileBill: optionalFloat,
    transportationCost: optionalFloat,
    managerSalary: optionalFloat,
    stationery: optionalFloat,
    securitySalary: optionalFloat,
    donation: optionalFloat,
    compensation: optionalFloat,
    bkashBill: optionalFloat,
    electricityBill: optionalFloat,
    officeRent: optionalFloat,
    misc: optionalFloat,
});

export const updateDailyExpenseSchema = createDailyExpenseSchema.partial();

export const createPartyLesSchema = z.object({
    expenseId: z.string(),
    TR: z.string().min(1, "TR ID is required"),
    totalAmount: z
        .union([z.string(), z.number()])
        .transform((v) => Number(v))
        .refine((v) => Number.isInteger(v) && v >= 0, { message: "Total amount must be a non-negative integer" }),
    discountAmount: z
        .union([z.string(), z.number()])
        .transform((v) => Number(v))
        .refine((v) => Number.isInteger(v) && v >= 0, { message: "Discount amount must be a non-negative integer" }),
    note: z.string().min(1, "Note is required"),
});

export const updatePartyLesSchema = createPartyLesSchema.partial();

export type TCreateDailyExpenseInput = z.infer<typeof createDailyExpenseSchema>;
export type TUpdateDailyExpenseInput = z.infer<typeof updateDailyExpenseSchema>;
export type TCreatePartyLesInput = z.infer<typeof createPartyLesSchema>;
export type TUpdatePartyLesInput = z.infer<typeof updatePartyLesSchema>;
