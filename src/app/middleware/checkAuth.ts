import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../envConfig/index.js";
import { UserRole } from "../modules/user/user.interface.js";
import { prisma } from "../DBConfig/db.js";
import { verifyToken } from "../utils/jwtToken.js";
import AppError from "./AppError.js";

export type decodedPayload = {
    userId: string,
    email: string,
    role: UserRole
}

export const validateUser = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {

    try {
        const accessToken = req.cookies.accessToken || req.headers.authorization;
        
        if (!accessToken) {
            throw new AppError(403, "Token Not found")
        }

        const verifiedToken = verifyToken(accessToken, envVars.ACCESS_TOKEN_SECRETE) as JwtPayload

        const isUserExist = await prisma.user.findUnique({ where: { email: verifiedToken.email } })

        if (!isUserExist) {
            throw new AppError(httpStatus.BAD_REQUEST, "User does not exist")
        }

        if (!authRoles.includes(verifiedToken.role)) {
            throw new AppError(403, "You are not authorized for this route!!!")
        }
        req.user = verifiedToken
        next()

    } catch (error) {
        console.log("jwt error", error);
        next(error)
    }
}