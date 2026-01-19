-- AlterTable
ALTER TABLE "products" ADD COLUMN     "colorsImages" JSONB[] DEFAULT ARRAY[]::JSONB[];
