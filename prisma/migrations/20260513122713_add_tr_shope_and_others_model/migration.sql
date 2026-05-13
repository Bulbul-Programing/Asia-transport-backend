-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';

-- CreateTable
CREATE TABLE "TR" (
    "id" TEXT NOT NULL,
    "TRID" DOUBLE PRECISION NOT NULL,
    "shopId" TEXT NOT NULL,
    "dhakaPartyId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "paymentStatus" BOOLEAN NOT NULL,
    "taka" DOUBLE PRECISION NOT NULL,
    "bookingDate" TIMESTAMP(3) NOT NULL,
    "isOfficeDelivery" BOOLEAN NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TR_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dailyCollection" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalCollection" INTEGER NOT NULL,
    "vanIncome" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dailyCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyExpense" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "labourSalary" DOUBLE PRECISION NOT NULL,
    "officeCost" DOUBLE PRECISION NOT NULL,
    "carRent" DOUBLE PRECISION,
    "vanRepair" DOUBLE PRECISION,
    "mobileBill" DOUBLE PRECISION,
    "transportationCost" DOUBLE PRECISION,
    "managerSalary" DOUBLE PRECISION,
    "stationery" DOUBLE PRECISION,
    "securitySalary" DOUBLE PRECISION,
    "donation" DOUBLE PRECISION,
    "compensation" DOUBLE PRECISION,
    "bkashBill" DOUBLE PRECISION,
    "electricityBill" DOUBLE PRECISION,
    "officeRent" DOUBLE PRECISION,
    "misc" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyExpense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partyLes" (
    "id" TEXT NOT NULL,
    "whichDay" TEXT NOT NULL,
    "TR" DOUBLE PRECISION NOT NULL,
    "totalAmount" INTEGER NOT NULL,
    "discountAmount" INTEGER NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "partyLes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DhakaParty" (
    "id" TEXT NOT NULL,
    "shopName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DhakaParty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shop" (
    "id" TEXT NOT NULL,
    "shopName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TR_TRID_key" ON "TR"("TRID");

-- CreateIndex
CREATE UNIQUE INDEX "partyLes_TR_key" ON "partyLes"("TR");

-- AddForeignKey
ALTER TABLE "TR" ADD CONSTRAINT "TR_dhakaPartyId_fkey" FOREIGN KEY ("dhakaPartyId") REFERENCES "DhakaParty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TR" ADD CONSTRAINT "TR_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partyLes" ADD CONSTRAINT "partyLes_TR_fkey" FOREIGN KEY ("TR") REFERENCES "TR"("TRID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partyLes" ADD CONSTRAINT "partyLes_whichDay_fkey" FOREIGN KEY ("whichDay") REFERENCES "DailyExpense"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
