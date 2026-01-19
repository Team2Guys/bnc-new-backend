/*
  Warnings:

  - You are about to drop the column `customer_name` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `last_editedBy` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `posterImage` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `reveiw_description` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `star_rating` on the `reviews` table. All the data in the column will be lost.
  - Added the required column `ReviewsDescription` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "customer_name",
DROP COLUMN "last_editedBy",
DROP COLUMN "posterImage",
DROP COLUMN "reveiw_description",
DROP COLUMN "star_rating",
ADD COLUMN     "ReviewsDescription" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "posterImageUrl" JSONB,
ADD COLUMN     "reviewDate" TEXT,
ADD COLUMN     "starRating" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ALTER COLUMN "createdAt" DROP NOT NULL;
