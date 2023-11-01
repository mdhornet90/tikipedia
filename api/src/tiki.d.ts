const { UUID } = require('crypto');

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

interface DBUniqueness {
  mangledName: string;
}
interface Ingredient {
  id: UUID;
  name: string;
  abv: number?;
}

interface CreateIngredientInput {
  name: string;
  abv: number?;
}

type EditIngredientInput = DeepPartial<CreateIngredientInput>;

type CreateIngredientDBInput = CreateIngredientInput & DBUniqueness;
type EditIngredientDBInput = EditIngredientInput & DeepPartial<DBUniqueness>;

interface Glassware {
  id: UUID;
  name: string;
}

interface CreateGlasswareInput {
  name: string;
}
type EditGlasswareInput = CreateGlasswareInput;

type CreateGlasswareDBInput = CreateGlasswareInput & DBUniqueness;
type EditGlasswareDBInput = EditGlasswareInput & DBUniqueness;

interface Recipe {
  id: UUID;
  imageUrl?: string;
  title: string;
  instructions: string;
  glasswareId: UUID;
}

interface RecipeInput {
  title: string;
  imageUrl?: string;
  instructions: string;
  glasswareId: UUID;
  ingredientInputs: RecipeIngredientInput[];
}

type RecipeDBInput = RecipeInput & DBUniqueness;

interface RecipeIngredientInput {
  ingredientId: UUID;
  index: number;
  quantity: number;
  unit: string;
}

enum Unit {
  OZ = 'oz',
  TSP = 'tsp',
  TBSP = 'tbsp',
  DASH = 'dash',
  DROP = 'drop',
  EACH = 'each',
}

interface DatabaseError {
  code: string;
}
