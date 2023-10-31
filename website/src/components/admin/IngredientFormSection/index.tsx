interface IngredientFormSectionProps {
  allIngredients: Ingredient[];
  ingredientInputs: Form.RecipeIngredient[];
  valid: boolean;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

export default function IngredientFormSection(
  props: IngredientFormSectionProps
) {
  return <div></div>;
}
