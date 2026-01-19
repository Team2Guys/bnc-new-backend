/*
  Warnings:

  - You are about to drop the column `Imageurl` on the `Categories` table. All the data in the column will be lost.
  - You are about to drop the column `Imageurl` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `posterImage` to the `Categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CategoryId` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posterImage` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Categories" DROP COLUMN "Imageurl",
ADD COLUMN     "posterImage" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "Imageurl",
ADD COLUMN     "CategoryId" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "imageUrls" JSONB[],
ADD COLUMN     "posterImage" JSONB NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "User";

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
