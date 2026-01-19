-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_SubCategoryId_fkey";

-- CreateTable
CREATE TABLE "_SubCategoryToProducts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SubCategoryToProducts_AB_unique" ON "_SubCategoryToProducts"("A", "B");

-- CreateIndex
CREATE INDEX "_SubCategoryToProducts_B_index" ON "_SubCategoryToProducts"("B");

-- AddForeignKey
ALTER TABLE "_SubCategoryToProducts" ADD CONSTRAINT "_SubCategoryToProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "SubCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubCategoryToProducts" ADD CONSTRAINT "_SubCategoryToProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
