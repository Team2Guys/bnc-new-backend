-- AlterTable
ALTER TABLE "Admins" ADD COLUMN     "canAddSubCategory" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canDeleteSubCategory" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canEditSubCategory" BOOLEAN NOT NULL DEFAULT false;
