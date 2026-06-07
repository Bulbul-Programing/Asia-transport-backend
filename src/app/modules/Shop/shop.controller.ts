import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { shopService } from "./shop.service";

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