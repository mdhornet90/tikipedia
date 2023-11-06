import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void | void[]> {
  await knex.schema.createTable('glassware', table => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v1mc()'));
    table.string('name');
    table.string('mangled_name').unique();
  });
  await knex.schema.createTable('recipes', table => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v1mc()'));
    table.string('title');
    table.string('image_url');
    table.string('mangled_name').unique();
    table.string('instructions');
    table.uuid('glassware_id').references('glassware.id').onDelete('CASCADE');
  });
  await knex.schema.createTable('ingredients', table => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v1mc()'));
    table.string('name');
    table.string('mangled_name').unique();
    table.decimal('abv').defaultTo(0);
    table.uuid('recipe_id').references('recipes.id').nullable();
  });
  await knex.schema.createTable('recipes_ingredients', table => {
    table.uuid('recipe_id').references('recipes.id').onDelete('CASCADE');
    table.uuid('ingredient_id').references('ingredients.id').onDelete('CASCADE');
    table.integer('index');
    table.decimal('quantity');
    table.string('unit');
    table.unique(['recipe_id', 'ingredient_id']);
    table.index(['recipe_id', 'ingredient_id', 'index']);
  });
}

export async function down(knex: Knex): Promise<void | void[]> {
  await knex.schema.dropTable('recipes_ingredients');
  await knex.schema.dropTable('ingredients');
  await knex.schema.dropTable('recipes');
  await knex.schema.dropTable('glassware');
}
