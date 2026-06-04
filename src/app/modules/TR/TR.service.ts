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

const createMultipleTR = async (payloads: TTR[]) => {
    console.log(payloads);
    return await prisma.$transaction(async (tx) => {
        const results = [];

        for (const payload of payloads) {
            // Format TRID
            payload.TRID = payload.TRID.toString().padStart(6, "0");

            // Check existing TRID
            const isExistTR = await tx.tR.findUnique({
                where: {
                    TRID: payload.TRID,
                },
            });

            if (isExistTR) {
                const lastTR = await tx.tR.findFirst({
                    orderBy: {
                        createdAt: "desc",
                    },
                });

                const increaseTR = Number(lastTR?.TRID || 0) + 1;
                payload.TRID = increaseTR.toString().padStart(6, "0");
            }

            // Find or create shop
            let shop = await tx.shop.findFirst({
                where: {
                    shopName: payload.shopName,
                },
            });

            if (!shop) {
                shop = await tx.shop.create({
                    data: {
                        shopName: payload.shopName,
                    },
                });
            }

            payload.shopId = shop.id;

            // Create TR
            const tr = await tx.tR.create({
                data: payload,
            });

            results.push(tr);
        }

        return results;
    });
};

const getTRByBookingDate = async (bookingDate : Date) => {
    console.log(bookingDate);
}

export const TRService = {
    createTR,
    createMultipleTR,
    getTRByBookingDate
}