-- CreateTable
CREATE TABLE "reviews" (
    "id" SERIAL NOT NULL,
    "customer_name" TEXT NOT NULL,
    "star_rating" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reveiw_description" TEXT NOT NULL,
    "last_editedBy" TEXT,
    "posterImage" JSONB,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);
