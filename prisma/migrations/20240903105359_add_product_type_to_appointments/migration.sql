/*
  Warnings:

  - The `product_type` column on the `Appointments` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Appointments" DROP COLUMN "product_type",
ADD COLUMN     "product_type" TEXT[];
