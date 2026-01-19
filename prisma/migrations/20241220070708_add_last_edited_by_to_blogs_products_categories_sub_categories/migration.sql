-- AlterTable
ALTER TABLE "Categories" ADD COLUMN     "last_editedBy" TEXT;

-- AlterTable
ALTER TABLE "SubCategories" ADD COLUMN     "last_editedBy" TEXT;

-- AlterTable
ALTER TABLE "blogs" ADD COLUMN     "last_editedBy" TEXT;

-- AlterTable
ALTER TABLE "blogs_comments" ADD COLUMN     "last_editedBy" TEXT;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "last_editedBy" TEXT;
