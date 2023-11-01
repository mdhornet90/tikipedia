import { UUID } from 'crypto';
import { knex } from '../../db';

export const findAll = () => knex('glassware');

export const findOne = (id: UUID) => knex('glassware').where('id', id).first();

export async function insert(glassware: CreateGlasswareDBInput) {
  let [result] = await knex('glassware').insert(glassware).returning('*');
  return result;
}

export async function update(id: UUID, glassware: EditGlasswareDBInput) {
  let [result] = await knex('glassware').where({ id }).update(glassware).returning('*');
  return result;
}
