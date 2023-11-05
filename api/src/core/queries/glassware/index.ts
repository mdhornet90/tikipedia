import { UUID } from 'crypto';
import { knex } from '../../db';

export const findAll = () => knex('glassware').orderBy('name');

export const findOne = (id: UUID) => knex('glassware').where('id', id).first();

export async function insert(glassware: Glassware.DB.Create) {
  const [result] = await knex('glassware').insert(glassware).returning('*');
  return result;
}

export async function update(id: UUID, glassware: Glassware.DB.Edit) {
  const [result] = await knex('glassware').where({ id }).update(glassware).returning('*');
  return result;
}

export async function remove(id: UUID) {
  await knex('glassware').where({ id }).delete();
}
