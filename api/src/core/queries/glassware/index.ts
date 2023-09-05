import { UUID } from 'crypto';
import { knex } from '../../db';

export const findAll = () => knex('glassware');

export const findOne = (id: UUID) => knex('glassare').where('id', id).first();

export async function insert(glassware: GlasswareInput) {
  let [result] = await knex('glassware').insert(glassware).returning('*');
  return result;
}
