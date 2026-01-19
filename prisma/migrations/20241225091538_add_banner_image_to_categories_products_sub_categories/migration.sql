-- AlterTable
ALTER TABLE "Categories" ADD COLUMN     "bannerImage" JSONB;

-- AlterTable
ALTER TABLE "SubCategories" ADD COLUMN     "bannerImage" JSONB;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "bannerImage" JSONB;
