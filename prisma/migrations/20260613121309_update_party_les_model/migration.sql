/*
  Warnings:

  - You are about to drop the column `whichDay` on the `partyLes` table. All the data in the column will be lost.
  - Added the required column `expenseId` to the `partyLes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "partyLes" DROP CONSTRAINT "partyLes_whichDay_fkey";

-- AlterTable
ALTER TABLE "partyLes" DROP COLUMN "whichDay",
ADD COLUMN     "expenseId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "partyLes" ADD CONSTRAINT "partyLes_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "DailyExpense"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
