import { UUID } from 'crypto';
import { knex } from '../../db';

export const findAll = () => knex('garnishes').orderBy('name');

export const findOne = (id: UUID) => knex('garnishes').where({ id }).first();

export async function insert(garnish: Garnish.DB.Create) {
  const [result] = await knex('garnishes').insert(garnish).returning('*');
  return result;
}

export async function update(id: UUID, garnish: Garnish.DB.Edit) {
  const [result] = await knex('garnishes').where({ id }).update(garnish).returning('*');
  return result;
}

export async function remove(id: UUID) {
  await knex('garnishes').where({ id }).delete();
}

export const findAllForRecipe = (recipeId: UUID) =>
  knex('garnishes')
    .leftJoin('recipes_garnishes AS rg', 'rg.garnish_id', 'garnishes.id')
    .select('garnishes.name', 'rg.quantity')
    .where('rg.recipe_id', '=', recipeId)
    .orderBy('rg.index');
