import { UUID } from 'crypto';
import { knex } from '../../db';

export const findAll = () => knex('ingredients');

export const findOne = (id: UUID) => knex('ingredients').where('id', id).first();

export async function insert(ingredient: CreateIngredientDBInput) {
  const [result] = await knex('ingredients').insert(ingredient).returning('*');
  return result;
}

export async function update(id: UUID, ingredient: EditIngredientDBInput) {
  const [result] = await knex('ingredients').where({ id }).update(ingredient).returning('*');
  return result;
}

export const findAllForRecipe = (recipeId: UUID) =>
  knex('ingredients')
    .leftJoin('recipes_ingredients AS ri', 'ri.ingredient_id', 'ingredients.id')
    .select('ingredients.name', 'ri.quantity', 'ri.unit')
    .where('ri.recipe_id', '=', recipeId)
    .orderBy('ri.index');
