import { useEffect, useMemo, useState } from "react";
import {
  existingValueValidationFns,
  recipeGarnishValid,
  recipeIngredientValid,
} from "./utils";

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
      glasswareLookup,
      garnishLookup
    );
    return initialForm
      ? new ExistingFormValidator(initialForm, newFormValidator)
      : newFormValidator;
  }, [initialForm, units, garnishLookup, glasswareLookup]);

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    setFormValid(formValidator.validate(form));
  }, [units, form, formValidator]);

  return formValid;
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
  private allGarnishes: Record<string, Input.Data.Garnish>;
  private glasswareLookup: Record<string, Input.Data.Glassware>;

  constructor(
    allUnits: Set<string>,
    glasswareLookup: Record<string, Input.Data.Glassware>,
    allGarnishes: Record<string, Input.Data.Garnish>
  ) {
    this.allUnits = allUnits;
    this.glasswareLookup = glasswareLookup;
    this.allGarnishes = allGarnishes;
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
