exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name', 100).notNullable();
      table.string('email', 255).unique().notNullable();
      table.string('password', 255).notNullable();
      table.boolean('subscribed').defaultTo(false);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };
  