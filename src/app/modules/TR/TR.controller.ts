import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { TRService } from "./TR.service";
import { sendResponse } from "../../utils/sendResponse";
import AppError from "../../middleware/AppError";


const createTR = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body
    const result = await TRService.createTR(payload);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "TR Create successfully!",
        data: result
    })
})

const createMultipleTR = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body
    const result = await TRService.createMultipleTR(payload);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Multiple TR Create successfully!",
        data: result
    })
})

const getTRsByBookingDate = catchAsync(async (req: Request, res: Response) => {
    const options = req.query

    const result = await TRService.getTRsByBookingDate(options);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Bookings retrieved successfully!",
        data: result
    })
})

const getTR = catchAsync(async (req: Request, res: Response) => {
    const trId = req.params.trid as string

    const result = await TRService.getTR(trId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "TR retrieved successfully!",
        data: result
    })
})

const updateTR = catchAsync(async (req: Request, res: Response) => {
    const trId = req.params.trid as string
    const payload = req.body

    const result = await TRService.updateTR(trId, payload);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "TR update successfully!",
        data: result
    })
})

const updateTRPaymentStatus = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body

    if (!payload.TRIDS) {
        throw new AppError(403, "Please Provide TR IDs")
    }

    const result = await TRService.updateTRPaymentStatus(payload.TRIDS);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "TR payment status update successfully!",
        data: result
    })
})

export const TRController = {
    createTR,
    createMultipleTR,
    getTRsByBookingDate,
    getTR,
    updateTR,
    updateTRPaymentStatus
}