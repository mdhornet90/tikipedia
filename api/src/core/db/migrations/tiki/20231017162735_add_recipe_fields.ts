import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void | void[]> {
  return knex.schema.alterTable('recipes', table => {
    table.string('image_url');
    table.renameColumn('name', 'title');
  });
}

export async function down(knex: Knex): Promise<void | void[]> {
  return knex.schema.alterTable('recipes', table => {
    table.dropColumn('image_url');
    table.renameColumn('title', 'name');
  });
}
