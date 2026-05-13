import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { userService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";

const createUser = catchAsync(async (req: Request, res: Response) => {
    const userInfo = req.body
    const result = await userService.createUser(userInfo);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User created successfully!",
        data: result
    })
})

const createAdmin = catchAsync(async (req: Request, res: Response) => {
    const userInfo = req.body
    const result = await userService.createAdmin(userInfo);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User created successfully!",
        data: result
    })
})
const getAllUser = catchAsync(async (req: Request, res: Response) => {
    const queryInfo = req.query
    const result = await userService.getAllUser(queryInfo);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User data retrieve successfully!",
        data: result
    })
})

export const userController = {
    createUser,
    createAdmin,
    getAllUser
}