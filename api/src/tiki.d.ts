const { UUID } = require('crypto');

interface DBUniqueness {
  mangledName: string;
}
interface Ingredient {
  id: UUID;
  name: string;
  abv: number?;
}

interface IngredientInput {
  name: string;
  abv: number?;
}

type IngredientDBInput = IngredientInput & DBUniqueness;

interface Glassware {
  id: UUID;
  name: string;
}

interface GlasswareInput {
  name: string;
}

type GlasswareDBInput = GlasswareInput & DBUniqueness;

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
