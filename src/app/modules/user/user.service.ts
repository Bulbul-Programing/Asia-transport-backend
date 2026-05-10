import bcrypt from "bcryptjs";
import { prisma } from "../../DBConfig/db";
import AppError from "../../middleware/AppError";
import { TUser } from "./user.interface";
import { envVars } from "../../envConfig";


const createUser = async (payload: TUser) => {
    const isExistUser = await prisma.user.findUnique({
        where: { email: payload.email }
    })

    if (isExistUser) {
        throw new AppError(400, "User already exist")
    }

    const hashedPassword = await bcrypt.hash(payload.password, Number(envVars.BCRYPT_ROUNDS))
    payload.password = hashedPassword

    const createUser = await prisma.user.create({
        data: payload
    })

    return createUser
}

export const userService = {
    createUser
}