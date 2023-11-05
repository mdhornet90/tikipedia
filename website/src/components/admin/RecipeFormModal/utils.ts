type ExistingFormValidationFnLookup = Record<
  keyof Input.Recipe,
  (oldForm: Input.Recipe, newForm: Input.Recipe) => boolean
>;

export const existingValueValidationFns: ExistingFormValidationFnLookup = {
  title: (oldForm, newForm) => oldForm.title !== newForm.title,
  imageUrl: (oldForm, newForm) => oldForm.imageUrl !== newForm.imageUrl,
  ingredients: areIngredientsDifferent,
  glassware: (oldForm, newForm) => oldForm.glassware !== newForm.glassware,
  garnishes: areGarnishesDifferent,
  instructions: (oldForm, newForm) =>
    oldForm.instructions !== newForm.instructions,
};

export function areIngredientsDifferent(
  oldForm: Input.Recipe,
  newForm: Input.Recipe
) {
  return (
    oldForm.ingredients.length !== newForm.ingredients.length ||
    !oldForm.ingredients.every((oldIngredient, i) =>
      isIngredientEqual(oldIngredient, newForm.ingredients[i])
    )
  );
}

export function isIngredientEqual(
  oldIngredient: Input.RecipeIngredient,
  newIngredient: Input.RecipeIngredient
): boolean {
  return Object.keys(oldIngredient).every((key) => {
    const tKey = key as keyof Input.RecipeIngredient;
    return oldIngredient[tKey] === newIngredient[tKey];
  });
}

export function areGarnishesDifferent(
  oldForm: Input.Recipe,
  newForm: Input.Recipe
) {
  return (
    oldForm.garnishes.length !== newForm.garnishes.length ||
    !oldForm.garnishes.every((oldIngredient, i) =>
      isGarnishEqual(oldIngredient, newForm.garnishes[i])
    )
  );
}

export function isGarnishEqual(
  oldIngredient: Input.RecipeGarnish,
  newIngredient: Input.RecipeGarnish
): boolean {
  return Object.keys(oldIngredient).every((key) => {
    const tKey = key as keyof Input.RecipeGarnish;
    return oldIngredient[tKey] === newIngredient[tKey];
  });
}
