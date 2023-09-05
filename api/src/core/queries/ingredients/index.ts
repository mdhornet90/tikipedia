import { UUID } from 'crypto';
import { knex } from '../../db';

export const findAll = () => knex('ingredients');

export const findOne = (id: UUID) => knex('ingredients').where('id', id).first();

export async function insert(ingredient: IngredientInput) {
  let [result] = await knex('ingredients').insert(ingredient).returning('*');
  return result;
}
