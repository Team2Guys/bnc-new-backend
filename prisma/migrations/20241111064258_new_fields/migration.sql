/*
  Warnings:

  - You are about to drop the column `canCheckProfit` on the `Admins` table. All the data in the column will be lost.
  - You are about to drop the column `canCheckRevenue` on the `Admins` table. All the data in the column will be lost.
  - You are about to drop the column `canCheckVisitors` on the `Admins` table. All the data in the column will be lost.
  - You are about to drop the column `canViewSales` on the `Admins` table. All the data in the column will be lost.
  - You are about to drop the column `canViewUsers` on the `Admins` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Admins" DROP COLUMN "canCheckProfit",
DROP COLUMN "canCheckRevenue",
DROP COLUMN "canCheckVisitors",
DROP COLUMN "canViewSales",
DROP COLUMN "canViewUsers",
ADD COLUMN     "canAddBlog" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canDeleteBlog" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canEditBlog" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canVeiwTotalSubCategories" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canViewAppointments" BOOLEAN NOT NULL DEFAULT false;
