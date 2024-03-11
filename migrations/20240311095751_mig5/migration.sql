/*
  Warnings:

  - You are about to drop the column `userId` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_userId_fkey";

-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_userId_fkey";

-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Meal" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "SupabaseAuthUser" (
    "id" TEXT NOT NULL,
    "email" TEXT,

    CONSTRAINT "SupabaseAuthUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SupabaseAuthUser_email_key" ON "SupabaseAuthUser"("email");

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "SupabaseAuthUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
