import { knex } from '../core/db';

export const typeDef = `#graphql
    type Ingredient {
        name: String!
        abv: Float!
    }
    input IngredientInput {
        name: String!
        abv: Float
    }
`;

class Ingredients {
  async findAll() {
    return knex('ingredients');
  }

  async findOne(id: string) {
    return knex('ingredients').where('id', id).first();
  }

  async insert(ingredient: Ingredient) {
    let [result] = await knex('ingredients').insert(ingredient).returning('*');
    return result;
  }
}

const ingredients = new Ingredients();

export const resolvers = {
  Query: {
    async ingredients() {
      return ingredients.findAll();
    },

    async ingredient(id: string) {
      return ingredients.findOne(id);
    },
  },
  Mutation: {
    async createIngredient(_: any, { ingredient }: { ingredient: Ingredient }) {
      return ingredients.insert(ingredient);
    },
  },
};
