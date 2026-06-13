import { Request, Response, NextFunction } from "express";
import catchAsync from "../../utils/catchAsync.js";

import httpStatus from "http-status";
import { DailyExpenseService } from "./DailyExpense.service.js";
import { sendResponse } from "../../utils/sendResponse.js";

// ═════════════════════════════════════════════════════════════════════════════
//  DAILY EXPENSE
// ═════════════════════════════════════════════════════════════════════════════

const createDailyExpense = catchAsync(async (req: Request, res: Response) => {
    const result = await DailyExpenseService.createDailyExpense(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Daily Expense created successfully",
        data: result,
    });
});

const getAllDailyExpenses = catchAsync(async (req: Request, res: Response) => {
    const result = await DailyExpenseService.getAllDailyExpenses(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Daily Expenses retrieved successfully",
        meta: result.meta,
        data: result.data,
    });
});

const getDailyExpenseById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await DailyExpenseService.getDailyExpenseById(id as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Daily Expense retrieved successfully",
        data: result,
    });
});

const updateDailyExpense = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await DailyExpenseService.updateDailyExpense(id as string, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Daily Expense updated successfully",
        data: result,
    });
});

const deleteDailyExpense = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await DailyExpenseService.deleteDailyExpense(id as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Daily Expense deleted successfully",
        data: result,
    });
});

// ═════════════════════════════════════════════════════════════════════════════
//  PARTY LES
// ═════════════════════════════════════════════════════════════════════════════

const createPartyLes = catchAsync(async (req: Request, res: Response) => {
    const result = await DailyExpenseService.createPartyLes(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "PartyLes entry created successfully",
        data: result,
    });
});

const getAllPartyLesByExpense = catchAsync(async (req: Request, res: Response) => {
    const { dailyExpenseId } = req.params;
    const result = await DailyExpenseService.getAllPartyLesByExpense(dailyExpenseId as string, req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "PartyLes entries retrieved successfully",
        meta: result.meta,
        data: result.data,
    });
});

const getPartyLesById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await DailyExpenseService.getPartyLesById(id as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "PartyLes entry retrieved successfully",
        data: result,
    });
});

const updatePartyLes = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await DailyExpenseService.updatePartyLes(id as string, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "PartyLes entry updated successfully",
        data: result,
    });
});

const deletePartyLes = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await DailyExpenseService.deletePartyLes(id as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "PartyLes entry deleted successfully",
        data: result,
    });
});

export const DailyExpenseController = {
    // DailyExpense
    createDailyExpense,
    getAllDailyExpenses,
    getDailyExpenseById,
    updateDailyExpense,
    deleteDailyExpense,

    // PartyLes
    createPartyLes,
    getAllPartyLesByExpense,
    getPartyLesById,
    updatePartyLes,
    deletePartyLes,
};