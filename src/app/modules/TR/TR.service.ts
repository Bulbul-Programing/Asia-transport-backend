import { prisma } from "../../DBConfig/db";
import AppError from "../../middleware/AppError";
import { TTR } from "./TR.interface";


const createTR = async (payload: TTR) => {
    payload.TRID = payload.TRID.toString().padStart(6, '0')

    const isExistTR = await prisma.tR.findUnique({
        where: {
            TRID: payload.TRID
        }
    })

    if (isExistTR) {
        const lastBooking = await prisma.tR.findFirst({
            orderBy: {
                createdAt: "desc"
            },
            take: 1
        })
        const increaseTR = Number(lastBooking?.TRID) + 1
        payload.TRID = increaseTR.toString().padStart(6, '0')
    }

    const isExistShop = await prisma.shop.findFirst({
        where: {
            shopName: payload.shopName
        }
    })

    if (isExistShop) {
        payload.shopId = isExistShop?.id
    }

    if (!isExistShop) {
        const createNewShop = await prisma.shop.create({
            data: {
                shopName: payload.shopName
            }
        })

        payload.shopId = createNewShop.id
    }

    const createTR = await prisma.tR.create({
        data: payload
    })

    return createTR
}


export const TRService = {
    createTR
}