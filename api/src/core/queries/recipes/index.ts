import { UUID } from 'crypto';
import { knex } from '../../db';

export const findAll = () => knex('recipes').orderBy('title');

export const findOne = (id: UUID) => knex('recipes').where({ id }).first();

export async function insert({ ingredientInputs, ...recipeInput }: CreateRecipeDBInput) {
  return knex.transaction(async trx => {
    const [recipe] = await knex('recipes').insert(recipeInput).returning('*').transacting(trx);
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

export async function update(id: UUID, { ingredientInputs, ...recipeInput }: EditRecipeDBInput) {
  return knex.transaction(async trx => {
    let recipe: any;
    if (Object.keys(recipeInput).length > 0) {
      [recipe] = await knex('recipes')
        .where({ id })
        .update(recipeInput)
        .returning('*')
        .transacting(trx);
    } else {
      [recipe] = await knex('recipes').where({ id }).transacting(trx);
    }
    if (ingredientInputs) {
      await knex('recipes_ingredients').where({ recipeId: id }).delete().transacting(trx);
      await Promise.all(
        ingredientInputs.map((ingredientInput, i) =>
          knex('recipes_ingredients')
            .insert({ ...ingredientInput, index: i, recipeId: recipe.id })
            .transacting(trx),
        ),
      );
    }

    return recipe;
  });
}

export async function remove(id: UUID) {
  await knex('recipes').where({ id }).delete();
}
