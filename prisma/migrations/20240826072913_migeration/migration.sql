-- AlterTable
ALTER TABLE "products" ADD COLUMN     "SubCategoryId" INTEGER;

-- CreateTable
CREATE TABLE "SubCategories" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "CategoryId" INTEGER NOT NULL,
    "posterImage" JSONB NOT NULL,

    CONSTRAINT "SubCategories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubCategories_title_key" ON "SubCategories"("title");

-- AddForeignKey
ALTER TABLE "SubCategories" ADD CONSTRAINT "SubCategories_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_SubCategoryId_fkey" FOREIGN KEY ("SubCategoryId") REFERENCES "SubCategories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
