import { useEffect, useMemo, useState } from "react";

interface FormValidationProps {
  initialForm?: Input.Recipe;
  form: Input.Recipe;
  units: Set<string>;
  glasswareLookup: Record<string, Input.Data.Glassware>;
}

type ValidationFnLookup = Record<
  keyof Input.Recipe,
  (input: Input.Recipe) => boolean
>;

export default function useRecipeFormValidation({
  initialForm,
  form,
  units,
  glasswareLookup,
}: FormValidationProps) {
  const formValidator = useMemo(() => {
    const newFormValidator = new NewFormValidator(units, glasswareLookup);
    return initialForm
      ? new ExistingFormValidator(initialForm, newFormValidator)
      : newFormValidator;
  }, [initialForm, units, glasswareLookup]);

  const [formValid, setFormValid] = useState(false);
  const [ingredientSectionValid, setIngredientSectionValid] = useState(false);

  useEffect(() => {
    setFormValid(formValidator.formValid(form));
    setIngredientSectionValid(
      form.ingredients.every((ingredient) =>
        recipeIngredientValid(units, ingredient)
      )
    );
  }, [units, form, formValidator]);

  return { formValid, ingredientSectionValid };
}

interface FormValidator {
  formValid(form: Input.Recipe): boolean;
}

class ExistingFormValidator implements FormValidator {
  private initialForm: Input.Recipe;
  private underlyingFormValidator: FormValidator;
  constructor(
    initialForm: Input.Recipe,
    underlyingFormValidator: FormValidator
  ) {
    this.initialForm = initialForm;
    this.underlyingFormValidator = underlyingFormValidator;
  }

  formValid(form: Input.Recipe) {
    return true;
  }
}

class NewFormValidator implements FormValidator {
  private allUnits: Set<string>;
  private glasswareLookup: Record<string, Input.Data.Glassware>;

  constructor(
    allUnits: Set<string>,
    glasswareLookup: Record<string, Input.Data.Glassware>
  ) {
    this.allUnits = allUnits;
    this.glasswareLookup = glasswareLookup;
  }

  formValid(form: Input.Recipe) {
    return Object.keys(form).every((key) =>
      this.newValueValidationFns[key as keyof Input.Recipe](form)
    );
  }

  private newValueValidationFns: ValidationFnLookup = {
    title: ({ title }) => title.length > 0,
    imageUrl: ({ imageUrl }) => {
      if (!imageUrl) {
        return true;
      }

      try {
        new URL(imageUrl);
        return true;
      } catch {
        return false;
      }
    },
    ingredients: ({ ingredients }) =>
      ingredients.length > 0 &&
      ingredients.every((ingredient) =>
        recipeIngredientValid(this.allUnits, ingredient)
      ),
    glassware: ({ glassware }) => glassware in this.glasswareLookup,
    instructions: ({ instructions }) => instructions.length > 0,
  };
}

function recipeIngredientValid(
  allUnits: Set<string>,
  { name, quantity, unit }: Input.RecipeIngredient
) {
  if (name.length <= 0 || !allUnits.has(unit)) {
    return false;
  }

  try {
    const normalizedNumber = Number(quantity);
    return !isNaN(normalizedNumber) && normalizedNumber > 0;
  } catch {
    return false;
  }
}
