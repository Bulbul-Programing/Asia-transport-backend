import QueryBuilder from "../../builder/QueryBuilder";
import { prisma } from "../../DBConfig/db";
import AppError from "../../middleware/AppError";
import { paginationCalculation } from "../../utils/paginationCalculation";
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
    if (!isExistShop) {
        const createNewShop = await prisma.shop.create({
            data: {
                shopName: payload.shopName
            }
        })

        payload.shopId = createNewShop.id
    }

    if (isExistShop) {
        payload.shopId = isExistShop.id
    }


    const createTR = await prisma.tR.create({
        data: payload
    })

    return createTR
}

const createMultipleTR = async (payloads: TTR[]) => {
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

const getTRsByBookingDate = async (options: any) => {
    const { skip, page, limit } = paginationCalculation(options)

    const TRQueryBuilder = new QueryBuilder(options)
        .searching(['shopName'])
        .filterByDate("bookingDate")
        .fields()
        .sort()
        .paginate()

    const result = await prisma.tR.findMany({
        ...TRQueryBuilder.prismaQuery
    })

    const total = await prisma.tR.count({
        where: TRQueryBuilder.prismaQuery.where
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

const getTR = async (tr: string) => {
    const roundTR = tr.toString().padStart(6, '0')
    const result = await prisma.tR.findUnique({
        where: {
            TRID: roundTR
        }
    })

    return result
}

const updateTR = async (tr: string, payload: Partial<TTR>) => {
    const roundTR = tr.toString().padStart(6, '0')
    const isExistTR = await prisma.tR.findUnique({
        where: { TRID: roundTR }
    })

    if (!isExistTR) {
        throw new AppError(404, "TR Not Found!")
    }

    if (payload.TRID) {
        payload.TRID = payload.TRID.toString().padStart(6, '0')
    }

    if (payload.shopName) {
        const isExistShop = await prisma.shop.findFirst({
            where: {
                shopName: payload.shopName
            }
        })
        if (!isExistShop) {
            const createNewShop = await prisma.shop.create({
                data: {
                    shopName: payload.shopName
                }
            })

            payload.shopId = createNewShop.id
        }

        if (isExistShop) {
            payload.shopId = isExistShop.id
        }
    }


    const updateTR = await prisma.tR.update({
        where: { TRID: roundTR },
        data: payload
    })

    return updateTR
}

const updateTRPaymentStatus = async (trs: string[]) => {
    const roundedTRS = []

    for (let i = 0; i < trs.length; i++) {
        roundedTRS.push(trs[i].toString().padStart(6, '0'))
    }

    const existingTRs = await prisma.tR.findMany({
        where: {
            TRID: {
                in: roundedTRS,
            },
        },
    });

    const foundIds = existingTRs.map((tr) => tr.TRID);

    const missingIds = roundedTRS.filter((id) => !foundIds.includes(id));

    if (missingIds.length > 0) {
        throw new Error(`TR not found: ${missingIds.join(", ")}`);
    }

    const totalDueCollection = existingTRs.reduce((sum, current) => {
        if (!current.paymentStatus) {
            return sum + current.taka
        }
        return sum
    }, 0)

    const findAlreadyPaidTR = await prisma.tR.findMany({
        where: {
            TRID: {
                in: roundedTRS,
            },
            paymentStatus: true
        }
    });

    if (findAlreadyPaidTR.length > 0) {
        const onlyPaidTR = findAlreadyPaidTR.map((tr) => tr.TRID)
        throw new AppError(403, `Those TR is already Paid "${onlyPaidTR}"`)
    }

    const updateTR = await prisma.tR.updateMany({
        where: {
            TRID: {
                in: roundedTRS,
            },
        },
        data: {
            paymentStatus: true,
        },
    });

    return updateTR

};

const deleteTR = async (trid: string) => {
    const roundedTR = trid.toString().padStart(6, '0')
    const isExistTR = await prisma.tR.findUnique({
        where: {
            TRID: roundedTR
        }
    })

    if (!isExistTR) {
        throw new AppError(404, "TR Not found")
    }

    const res = await prisma.tR.delete({
        where: {
            TRID: roundedTR
        }
    })
    return res
}

export const TRService = {
    createTR,
    createMultipleTR,
    getTRsByBookingDate,
    getTR,
    updateTR,
    updateTRPaymentStatus,
    deleteTR
}