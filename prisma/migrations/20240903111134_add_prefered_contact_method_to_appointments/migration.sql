/*
  Warnings:

  - The `prefered_contact_method` column on the `Appointments` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Appointments" ADD COLUMN     "other" TEXT,
DROP COLUMN "prefered_contact_method",
ADD COLUMN     "prefered_contact_method" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- DropEnum
DROP TYPE "ProductType";
