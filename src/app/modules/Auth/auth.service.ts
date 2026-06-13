import { prisma } from "../../DBConfig/db.js";
import AppError from "../../error/AppError.js"
import bcrypt from 'bcryptjs';
import { createUserTokens } from "../../utils/userToken.js";

const loginUser = async (payload: { email: string, password: string }) => {
    const isUserExist = await prisma.user.findUnique({
        where: { email: payload.email }
    })

    if (!isUserExist) {
        throw new AppError(400, "Invalid credentials")
    }

    const isPasswordMatched = await bcrypt.compare(payload.password, isUserExist.password)
    if (!isPasswordMatched) {
        throw new AppError(400, "Invalid credentials")
    }

    const TokenPayload = {
        id: isUserExist.id,
        email: isUserExist.email,
        role: isUserExist.role
    }

    const userToken = createUserTokens(TokenPayload)

    const { password, ...rest } = isUserExist

    return {
        userData: rest,
        userToken
    }
}

const getMe = async (email: string) => {
    const isUserExist = await prisma.user.findUnique({
        where: { email }
    })

    if (!isUserExist) {
        throw new AppError(404, "User not found")
    }

    const { password, ...rest } = isUserExist

    return rest
}

export const authService = {
    loginUser,
    getMe
}