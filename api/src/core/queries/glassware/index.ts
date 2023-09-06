import { UUID } from 'crypto';
import { knex } from '../../db';

export const findAll = () => knex('glassware');

export const findOne = (id: UUID) => knex('glassware').where('id', id).first();

export async function insert(glassware: GlasswareDBInput) {
  let [result] = await knex('glassware').insert(glassware).returning('*');
  return result;
}
