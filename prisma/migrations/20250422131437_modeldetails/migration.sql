-- AlterTable
ALTER TABLE "products" ADD COLUMN     "modelDetails" JSONB[] DEFAULT ARRAY[]::JSONB[];
