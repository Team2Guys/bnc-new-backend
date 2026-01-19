-- AlterTable
ALTER TABLE "Categories" ADD COLUMN     "breakcrum" TEXT,
ADD COLUMN     "faqHeading" TEXT,
ADD COLUMN     "faqs" JSONB[] DEFAULT ARRAY[]::JSONB[],
ADD COLUMN     "headingchecks" JSONB[] DEFAULT ARRAY[]::JSONB[],
ADD COLUMN     "productpageHeading" TEXT,
ADD COLUMN     "topHeading" TEXT;
