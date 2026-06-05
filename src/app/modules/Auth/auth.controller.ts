import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import { setAuthCookie } from "../../utils/setCookie";

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const userCredential = req.body
    const result = await authService.loginUser(userCredential);

    

    setAuthCookie(res, result.userToken)

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User Login successfully!",
        data: result.userData
    })
})

const getMe = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.user
    const result = await authService.getMe(email);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User information retrieved successfully!",
        data: result
    })
})

const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User Logged Out Successfully",
        data: null,
    })
})

export const authController = {
    loginUser,
    logout,
    getMe
}