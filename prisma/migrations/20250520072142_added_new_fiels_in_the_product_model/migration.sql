-- AlterTable
ALTER TABLE "products" ADD COLUMN     "breadcurum" TEXT,
ADD COLUMN     "customUrl" TEXT,
ADD COLUMN     "faqs" JSONB[] DEFAULT ARRAY[]::JSONB[],
ADD COLUMN     "mainHeading" TEXT,
ADD COLUMN     "privacySectoin" JSONB[] DEFAULT ARRAY[]::JSONB[],
ADD COLUMN     "privarcyImage" JSONB,
ADD COLUMN     "topHeading" TEXT,
ADD COLUMN     "topImages" JSONB[] DEFAULT ARRAY[]::JSONB[],
ADD COLUMN     "videos" JSONB[] DEFAULT ARRAY[]::JSONB[],
ALTER COLUMN "colors" SET DEFAULT ARRAY[]::JSONB[];
