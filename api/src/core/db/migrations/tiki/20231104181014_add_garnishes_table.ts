import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void | void[]> {
  await knex.schema.createTable('garnishes', table => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v1mc()'));
    table.string('name');
  });

  await knex.schema.createTable('recipes_garnishes', table => {
    table.uuid('recipe_id').references('recipes.id').onDelete('CASCADE');
    table.uuid('garnish_id').references('garnishes.id').onDelete('CASCADE');
    table.integer('index');
    table.integer('quantity');
    table.unique(['recipe_id', 'garnish_id']);
    table.index(['recipe_id', 'garnish_id', 'index']);
  });
}

export async function down(knex: Knex): Promise<void | void[]> {
  await knex.schema.dropTable('recipes_garnishes');
  await knex.schema.dropTable('garnishes');
}
