-- AlterTable
ALTER TABLE "SubCategories" ADD COLUMN     "staticTitle" TEXT;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "subCategoryImage" JSONB,
ADD COLUMN     "subcategory_description" TEXT;
