/*
  Warnings:

  - You are about to drop the column `prefered_time` on the `Appointments` table. All the data in the column will be lost.
  - You are about to drop the column `product_tye` on the `Appointments` table. All the data in the column will be lost.
  - Added the required column `product_type` to the `Appointments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointments" DROP COLUMN "prefered_time",
DROP COLUMN "product_tye",
ADD COLUMN     "product_type" "ProductType" NOT NULL;
