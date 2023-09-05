const { UUID } = require('crypto');

interface Ingredient {
  id: UUID;
  name: string;
  abv: number?;
}

interface IngredientInput {
  name: string;
  abv: number?;
}

interface Glassware {
  id: UUID;
  name: string;
}

interface GlasswareInput {
  name: string;
}

interface DatabaseError {
  code: string;
}
