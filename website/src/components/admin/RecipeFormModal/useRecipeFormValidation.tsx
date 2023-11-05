import { useEffect, useMemo, useState } from "react";
import { existingValueValidationFns } from "./utils";

interface FormValidationProps {
  initialForm?: Input.Recipe;
  form: Input.Recipe;
  units: Set<string>;
  garnishLookup: Record<string, Input.Data.Garnish>;
  glasswareLookup: Record<string, Input.Data.Glassware>;
}

type NewFormValidationFnLookup = Record<
  keyof Input.Recipe,
  (input: Input.Recipe) => boolean
>;

export default function useRecipeFormValidation({
  initialForm,
  form,
  units,
  garnishLookup,
  glasswareLookup,
}: FormValidationProps) {
  const formValidator = useMemo(() => {
    const newFormValidator = new NewFormValidator(
      units,
      new Set(Object.keys(garnishLookup)),
      glasswareLookup
    );
    return initialForm
      ? new ExistingFormValidator(initialForm, newFormValidator)
      : newFormValidator;
  }, [initialForm, units, garnishLookup, glasswareLookup]);

  const [formValid, setFormValid] = useState(false);
  const [ingredientSectionValid, setIngredientSectionValid] = useState(false);

  useEffect(() => {
    setFormValid(formValidator.validate(form));
    setIngredientSectionValid(
      form.ingredients.every((ingredient) =>
        recipeIngredientValid(units, ingredient)
      )
    );
  }, [units, form, formValidator]);

  return { formValid, ingredientSectionValid };
}

interface FormValidator {
  validate(form: Input.Recipe): boolean;
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

  validate(form: Input.Recipe) {
    return (
      Object.keys(form).some((key) =>
        existingValueValidationFns[key as keyof Input.Recipe](
          this.initialForm,
          form
        )
      ) && this.underlyingFormValidator.validate(form)
    );
  }
}

class NewFormValidator implements FormValidator {
  private allUnits: Set<string>;
  private allGarnishes: Set<string>;
  private glasswareLookup: Record<string, Input.Data.Glassware>;

  constructor(
    allUnits: Set<string>,
    allGarnishes: Set<string>,
    glasswareLookup: Record<string, Input.Data.Glassware>
  ) {
    this.allUnits = allUnits;
    this.allGarnishes = allGarnishes;
    this.glasswareLookup = glasswareLookup;
  }

  validate(form: Input.Recipe) {
    return Object.keys(form).every((key) =>
      this.valueValidationFns[key as keyof Input.Recipe](form)
    );
  }

  private valueValidationFns: NewFormValidationFnLookup = {
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
    garnishes: ({ garnishes }) =>
      garnishes.length === 0 ||
      garnishes.every((g) => recipeGarnishValid(this.allGarnishes, g)),
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

function recipeGarnishValid(
  allGarnishes: Set<string>,
  { name, quantity }: Input.RecipeGarnish
) {
  if (!allGarnishes.has(name)) {
    return false;
  }

  try {
    const normalizedNumber = Number(quantity);
    return !isNaN(normalizedNumber) && normalizedNumber > 0;
  } catch {
    return false;
  }
}
