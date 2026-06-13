import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { shopService } from "./shop.service.js";

const getAllShop = catchAsync(async (req: Request, res: Response) => {
    const result = await shopService.getAllShop();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "All shop retrieved successfully!",
        data: result
    })
})

export const shopController = {
    getAllShop
}