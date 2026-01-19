-- CreateEnum
CREATE TYPE "BlogStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "blogs" ADD COLUMN     "status" "BlogStatus" NOT NULL DEFAULT 'PENDING';
