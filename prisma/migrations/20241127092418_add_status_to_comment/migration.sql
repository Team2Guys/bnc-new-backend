/*
  Warnings:

  - You are about to drop the column `status` on the `blogs` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "CommentStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "blogs" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "blogs_comments" ADD COLUMN     "status" "CommentStatus" NOT NULL DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "BlogStatus";
