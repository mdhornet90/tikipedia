import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void | void[]> {
  await knex.schema.alterTable('recipes', table => {
    table.string('slug').unique();
  });
}

export async function down(knex: Knex): Promise<void | void[]> {
  await knex.schema.alterTable('recipes', table => {
    table.dropColumn('slug');
  });
}
