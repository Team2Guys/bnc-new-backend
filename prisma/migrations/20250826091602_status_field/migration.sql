-- CreateEnum
CREATE TYPE "Status" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- AlterTable
ALTER TABLE "Categories" ADD COLUMN     "status" "Status" DEFAULT 'PUBLISHED';

-- AlterTable
ALTER TABLE "SubCategories" ADD COLUMN     "status" "Status" DEFAULT 'PUBLISHED';

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "status" "Status" DEFAULT 'PUBLISHED';
