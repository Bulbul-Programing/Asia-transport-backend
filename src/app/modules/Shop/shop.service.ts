import { prisma } from "../../DBConfig/db"



const getAllShop = async () => {
    const result = await prisma.shop.findMany()
    return result
}


export const shopService = {
    getAllShop
}