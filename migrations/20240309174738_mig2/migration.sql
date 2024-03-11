/*
  Warnings:

  - You are about to drop the `_IngredientToMeal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_IngredientToMeal" DROP CONSTRAINT "_IngredientToMeal_A_fkey";

-- DropForeignKey
ALTER TABLE "_IngredientToMeal" DROP CONSTRAINT "_IngredientToMeal_B_fkey";

-- DropTable
DROP TABLE "_IngredientToMeal";

-- CreateTable
CREATE TABLE "_MealToIngredient" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MealToIngredient_AB_unique" ON "_MealToIngredient"("A", "B");

-- CreateIndex
CREATE INDEX "_MealToIngredient_B_index" ON "_MealToIngredient"("B");

-- AddForeignKey
ALTER TABLE "_MealToIngredient" ADD CONSTRAINT "_MealToIngredient_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MealToIngredient" ADD CONSTRAINT "_MealToIngredient_B_fkey" FOREIGN KEY ("B") REFERENCES "Meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
