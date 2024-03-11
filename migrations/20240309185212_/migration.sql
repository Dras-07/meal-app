-- CreateTable
CREATE TABLE "MealToIngredient" (
    "mealId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,

    CONSTRAINT "MealToIngredient_pkey" PRIMARY KEY ("mealId","ingredientId")
);

-- AddForeignKey
ALTER TABLE "MealToIngredient" ADD CONSTRAINT "MealToIngredient_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealToIngredient" ADD CONSTRAINT "MealToIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
