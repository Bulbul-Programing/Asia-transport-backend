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
        throw new AppError(403, "This TR is Already exist.")
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
        console.log("g");
        payload.shopId = createNewShop.id
    }

    console.log(payload);

}


export const TRService = {
    createTR
}