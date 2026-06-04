import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { TRService } from "./TR.service";
import { sendResponse } from "../../utils/sendResponse";


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

export const TRController = {
    createTR,
    createMultipleTR,
    getTRsByBookingDate
}