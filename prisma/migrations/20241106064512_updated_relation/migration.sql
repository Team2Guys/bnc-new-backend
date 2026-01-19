/*
  Warnings:

  - Added the required column `blogId` to the `blogs_comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "blogs_comments" ADD COLUMN     "blogId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "blogs_comments" ADD CONSTRAINT "blogs_comments_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "blogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
