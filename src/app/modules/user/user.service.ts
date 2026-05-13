import bcrypt from "bcryptjs";
import { prisma } from "../../DBConfig/db";
import AppError from "../../middleware/AppError";
import { TUser, UserRole } from "./user.interface";
import { envVars } from "../../envConfig";
import { paginationCalculation } from "../../utils/paginationCalculation";
import QueryBuilder from "../../builder/QueryBuilder";


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

const createAdmin = async (payload: TUser) => {
    const isExistUser = await prisma.user.findUnique({
        where: { email: payload.email }
    })

    if (isExistUser) {
        throw new AppError(400, 'User already exist!')
    }

    const hashPassword = await bcrypt.hash(payload.password, Number(envVars.BCRYPT_ROUNDS))
    payload.password = hashPassword
    payload.role = UserRole.ADMIN

    const createUser = await prisma.user.create(
        {
            data: payload
        }
    )

    return createUser
}

const getAllUser = async (options: any) => {
    const {skip, page, limit } = paginationCalculation(options)

    const userQueryBuilder = new QueryBuilder(options)
        .searching(["name", "email", "shopName"])

    const result = await prisma.user.findMany({
        ...userQueryBuilder.prismaQuery
    })

    const total = await prisma.user.count({
        where: userQueryBuilder.prismaQuery.where
    })

    const returnData = {
        meta: {
            page: Number(page),
            limit: Number(limit),
            totalPage: Math.ceil(total / Number(limit)),
            total: total,
            skip: Number(skip)
        },
        data: result
    }

    return returnData

}

export const userService = {
    createUser,
    createAdmin,
    getAllUser
}