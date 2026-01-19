-- AlterTable
ALTER TABLE "products" ADD COLUMN     "Canonical_Tag" TEXT,
ADD COLUMN     "Images_Alt_Text" TEXT,
ADD COLUMN     "Meta_Title" TEXT,
ADD COLUMN     "Meta_description" TEXT,
ADD COLUMN     "colors" JSONB[];
