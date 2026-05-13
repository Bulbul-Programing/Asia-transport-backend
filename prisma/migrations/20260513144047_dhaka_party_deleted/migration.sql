/*
  Warnings:

  - You are about to drop the column `dhakaPartyId` on the `TR` table. All the data in the column will be lost.
  - You are about to drop the `DhakaParty` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TR" DROP CONSTRAINT "TR_dhakaPartyId_fkey";

-- AlterTable
ALTER TABLE "TR" DROP COLUMN "dhakaPartyId";

-- DropTable
DROP TABLE "DhakaParty";
