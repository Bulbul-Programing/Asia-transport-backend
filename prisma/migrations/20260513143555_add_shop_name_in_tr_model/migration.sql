/*
  Warnings:

  - Added the required column `shopName` to the `TR` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TR" ADD COLUMN     "shopName" TEXT NOT NULL;
