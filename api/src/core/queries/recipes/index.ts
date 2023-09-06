import { UUID } from 'crypto';
import { knex } from '../../db';

export const findAll = () => knex('recipes');

export const findOne = (id: UUID) => knex('recipes').where({ id }).first();

export async function insert({ ingredientInputs, ...recipeInput }: RecipeDBInput) {
  return knex.transaction(async trx => {
    let [recipe] = await knex('recipes').insert(recipeInput).returning('*').transacting(trx);
    await Promise.all(
      ingredientInputs.map((ingredientInput, i) =>
        knex('recipes_ingredients')
          .insert({ ...ingredientInput, index: i, recipeId: recipe.id })
          .transacting(trx),
      ),
    );

    return recipe;
  });
}
