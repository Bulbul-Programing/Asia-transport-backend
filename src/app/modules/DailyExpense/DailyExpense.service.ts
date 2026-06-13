import { prisma } from "../../DBConfig/db.js";
import AppError from "../../middleware/AppError.js";
import { paginationCalculation } from "../../utils/paginationCalculation.js";
import QueryBuilder from "../../builder/QueryBuilder.js";
import { TCreateDailyExpenseInput, TCreatePartyLesInput } from "./DailyExpense.validation.js";
import { TPartyLes } from "./DailyExpense.interface.js";

// ═════════════════════════════════════════════════════════════════════════════
//  DAILY EXPENSE
// ═════════════════════════════════════════════════════════════════════════════

const createDailyExpense = async (payload: TCreateDailyExpenseInput) => {
    // Prevent duplicate entry for the same date
    const isExist = await prisma.dailyExpense.findFirst({
        where: {
            date: payload.date,
        },
    });

    if (isExist) {
        throw new AppError(409, "A Daily Expense record already exists for this date");
    }

    const result = await prisma.dailyExpense.create({
        data: payload,
    });

    return result;
};

const getAllDailyExpenses = async (options: any) => {
    const { page, limit, skip } = paginationCalculation(options);

    const queryBuilder = new QueryBuilder(options)
        .filterByDate("date")
        .fields()
        .sort()
        .paginate();

    const result = await prisma.dailyExpense.findMany({
        ...queryBuilder.prismaQuery,
        include: {
            partyLes: true,
        },
    });

    const total = await prisma.dailyExpense.count({
        where: queryBuilder.prismaQuery.where,
    });

    return {
        meta: {
            page: Number(page),
            limit: Number(limit),
            totalPage: Math.ceil(total / Number(limit)),
            total,
            skip: Number(skip),
        },
        data: result,
    };
};

const getDailyExpenseById = async (id: string) => {
    const result = await prisma.dailyExpense.findUnique({
        where: { id },
        include: {
            partyLes: true,
        },
    });

    if (!result) {
        throw new AppError(404, "Daily Expense not found");
    }

    return result;
};

const updateDailyExpense = async (id: string, payload: Partial<TCreateDailyExpenseInput>) => {
    const isExist = await prisma.dailyExpense.findUnique({
        where: { id },
    });

    if (!isExist) {
        throw new AppError(404, "Daily Expense not found");
    }

    // If date is being changed, ensure no other record already uses that date
    if (payload.date) {
        const dateConflict = await prisma.dailyExpense.findFirst({
            where: {
                date: payload.date,
                NOT: { id },
            },
        });

        if (dateConflict) {
            throw new AppError(409, "Another Daily Expense record already exists for this date");
        }
    }

    const result = await prisma.dailyExpense.update({
        where: { id },
        data: payload,
    });

    return result;
};

const deleteDailyExpense = async (id: string) => {
    const isExist = await prisma.dailyExpense.findUnique({
        where: { id },
    });

    if (!isExist) {
        throw new AppError(404, "Daily Expense not found");
    }

    // Delete related partyLes first to avoid FK constraint error
    await prisma.partyLes.deleteMany({
        where: { expenseId: id },
    });

    const result = await prisma.dailyExpense.delete({
        where: { id },
    });

    return result;
};


const getAllPartyLesByExpense = async (dailyExpenseId: string, options: any) => {
    const { page, limit, skip } = paginationCalculation(options);

    // Guard: parent must exist
    const parentExpense = await prisma.dailyExpense.findUnique({
        where: { id: dailyExpenseId },
    });

    if (!parentExpense) {
        throw new AppError(404, "Daily Expense not found");
    }

    const result = await prisma.partyLes.findMany({
        where: { expenseId: dailyExpenseId },
        include: { tr: true },
        orderBy: { createdAt: "asc" },
        skip: Number(skip),
        take: Number(limit),
    });

    const total = await prisma.partyLes.count({
        where: { expenseId: dailyExpenseId },
    });

    return {
        meta: {
            page: Number(page),
            limit: Number(limit),
            totalPage: Math.ceil(total / Number(limit)),
            total,
            skip: Number(skip),
        },
        data: result,
    };
};

const createPartyLes = async (payload: TPartyLes) => {
    payload.TR = payload.TR.toString().padStart(6, '0')
    // Guard: parent DailyExpense must exist
    const parentExpense = await prisma.dailyExpense.findUnique({
        where: { id: payload.expenseId },
    });
  
    if (!parentExpense) {
        throw new AppError(404, "Daily Expense not found for the given whichDay ID");
    }

    // Guard: TR must exist
    const isExistTR = await prisma.tR.findUnique({
        where: { TRID: payload.TR },
    });

    if (!isExistTR) {
        throw new AppError(404, `TR "${payload.TR}" not found`);
    }

    // Guard: unique TR — one partyLes per TR
    const isDuplicateTR = await prisma.partyLes.findUnique({
        where: { TR: payload.TR },
    });

    if (isDuplicateTR) {
        throw new AppError(409, `A PartyLes entry already exists for TR "${payload.TR}"`);
    }

    const result = await prisma.partyLes.create({
        data: payload,
    });

    return result;
};

const getPartyLesById = async (id: string) => {
    const result = await prisma.partyLes.findUnique({
        where: { id },
        include: {
            tr: true,
            collectionDate: true,
        },
    });

    if (!result) {
        throw new AppError(404, "PartyLes entry not found");
    }

    return result;
};

const updatePartyLes = async (id: string, payload: Partial<TCreatePartyLesInput>) => {
    const isExist = await prisma.partyLes.findUnique({
        where: { id },
    });

    if (!isExist) {
        throw new AppError(404, "PartyLes entry not found");
    }

    // If TR is being changed, validate it exists and is not already taken
    if (payload.TR) {
        const isExistTR = await prisma.tR.findUnique({
            where: { TRID: payload.TR },
        });

        if (!isExistTR) {
            throw new AppError(404, `TR "${payload.TR}" not found`);
        }

        const isDuplicateTR = await prisma.partyLes.findFirst({
            where: {
                TR: payload.TR,
                NOT: { id },
            },
        });

        if (isDuplicateTR) {
            throw new AppError(409, `A PartyLes entry already exists for TR "${payload.TR}"`);
        }
    }

    // If whichDay is being changed, validate the new parent exists
    if (payload.expenseId) {
        const parentExpense = await prisma.dailyExpense.findUnique({
            where: { id: payload.expenseId },
        });

        if (!parentExpense) {
            throw new AppError(404, "Daily Expense not found for the given whichDay ID");
        }
    }

    const result = await prisma.partyLes.update({
        where: { id },
        data: payload,
    });

    return result;
};

const deletePartyLes = async (id: string) => {
    const isExist = await prisma.partyLes.findUnique({
        where: { id },
    });

    if (!isExist) {
        throw new AppError(404, "PartyLes entry not found");
    }

    const result = await prisma.partyLes.delete({
        where: { id },
    });

    return result;
};

export const DailyExpenseService = {
    // DailyExpense
    createDailyExpense,
    getAllDailyExpenses,
    getDailyExpenseById,
    updateDailyExpense,
    deleteDailyExpense,

    createPartyLes,
    getAllPartyLesByExpense,
    getPartyLesById,
    updatePartyLes,
    deletePartyLes,
};