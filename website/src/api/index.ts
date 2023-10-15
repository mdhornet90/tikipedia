export const getRecipeDetail = (id: string) => getDummyRecipe(id);

function getDummyRecipe(id: string): RecipeDetail {
  return {
    title: `Daiquiri ${parseInt(id) + 1}`,
    ingredients: [
      { amount: ".75", unit: "oz", name: "Demerara Rich Syrup" },
      { amount: ".75", unit: "oz", name: "Lime Juice" },
      { amount: "2", unit: "oz", name: "Rum Blend" },
    ],
    garnishes: ["dehyrdated lime wheel"],
    glassware: "Coupe",
    instructions:
      "Combine all ingredients in a shaker with ice. Shake vigorously and double strain into glass. Garnish by floating lime wheel on top.",
  };
}
