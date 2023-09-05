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

interface DatabaseError {
  code: string;
}
