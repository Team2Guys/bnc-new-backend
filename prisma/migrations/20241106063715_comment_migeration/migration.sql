-- CreateTable
CREATE TABLE "blogs_comments" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "replies" JSONB[],

    CONSTRAINT "blogs_comments_pkey" PRIMARY KEY ("id")
);
