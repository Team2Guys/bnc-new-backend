-- AlterTable
ALTER TABLE "Categories" ADD COLUMN     "Canonical_Tag" TEXT,
ADD COLUMN     "Images_Alt_Text" TEXT,
ADD COLUMN     "Meta_Title" TEXT,
ADD COLUMN     "Meta_description" TEXT;

-- AlterTable
ALTER TABLE "SubCategories" ADD COLUMN     "Canonical_Tag" TEXT,
ADD COLUMN     "Images_Alt_Text" TEXT,
ADD COLUMN     "Meta_Title" TEXT,
ADD COLUMN     "Meta_description" TEXT;
