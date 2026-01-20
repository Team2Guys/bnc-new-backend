-- CreateTable
CREATE TABLE "_RecallCategories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RecallCategories_AB_unique" ON "_RecallCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_RecallCategories_B_index" ON "_RecallCategories"("B");

-- AddForeignKey
ALTER TABLE "_RecallCategories" ADD CONSTRAINT "_RecallCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecallCategories" ADD CONSTRAINT "_RecallCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
