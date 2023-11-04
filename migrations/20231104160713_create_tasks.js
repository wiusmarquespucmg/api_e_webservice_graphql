/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('tasks', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.text('details');
      table.integer('status').defaultTo(0);
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('id').inTable('users'); // Substitua 'users' pelo nome da tabela de usuários
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('tasks');
  };
