-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('Blinds', 'Curtains', 'Shutters');

-- CreateEnum
CREATE TYPE "contact_method" AS ENUM ('Whatsapp', 'Email', 'Telephone');

-- CreateTable
CREATE TABLE "Appointments" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone_number" INTEGER NOT NULL,
    "area" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsapp_number" TEXT,
    "windows" TEXT NOT NULL,
    "prefered_Date" TIMESTAMP(3) NOT NULL,
    "prefered_time" TEXT NOT NULL,
    "how_user_find_us" TEXT NOT NULL,
    "user_query" TEXT NOT NULL,
    "product_tye" "ProductType" NOT NULL,
    "prefered_contact_method" "contact_method" NOT NULL,

    CONSTRAINT "Appointments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Appointments_email_key" ON "Appointments"("email");
