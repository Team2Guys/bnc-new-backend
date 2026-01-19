-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "ReviewsImages" JSONB[] DEFAULT ARRAY[]::JSONB[];
