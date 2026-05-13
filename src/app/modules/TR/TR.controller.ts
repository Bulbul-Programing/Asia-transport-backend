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

export const TRController = {
    createTR
}