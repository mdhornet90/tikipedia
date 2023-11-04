import { useEffect, useMemo, useState } from "react";

interface FormValidationProps {
  initialForm?: Input.Recipe;
  form: Input.Recipe;
  units: Set<string>;
  glasswareLookup: Record<string, Input.Data.Glassware>;
}

type ExistingFormValidationFnLookup = Record<
  keyof Input.Recipe,
  (oldForm: Input.Recipe, newForm: Input.Recipe) => boolean
>;

type NewFormValidationFnLookup = Record<
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
        this.valueValidationFns[key as keyof Input.Recipe](
          this.initialForm,
          form
        )
      ) && this.underlyingFormValidator.validate(form)
    );
  }

  private valueValidationFns: ExistingFormValidationFnLookup = {
    title: (oldForm, newForm) => oldForm.title !== newForm.title,
    imageUrl: (oldForm, newForm) => oldForm.imageUrl !== newForm.imageUrl,
    ingredients: (oldForm, newForm) =>
      oldForm.ingredients.length !== newForm.ingredients.length ||
      !oldForm.ingredients.every((oldIngredient, i) =>
        this.isIngredientEqual(oldIngredient, newForm.ingredients[i])
      ),
    glassware: (oldForm, newForm) => oldForm.glassware !== newForm.glassware,
    instructions: (oldForm, newForm) =>
      oldForm.instructions !== newForm.instructions,
  };

  private isIngredientEqual(
    oldIngredient: Input.RecipeIngredient,
    newIngredient: Input.RecipeIngredient
  ): boolean {
    return Object.keys(oldIngredient).every((key) => {
      const tKey = key as keyof Input.RecipeIngredient;
      return oldIngredient[tKey] === newIngredient[tKey];
    });
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
