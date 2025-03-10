exports.up = function(knex) {
    return knex.schema.createTable('contests', (table) => {
      table.increments('id').primary();
      table.string('name', 255).notNullable();
      table.string('url', 500).notNullable();
      table.dateTime('start_time').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('contests');
  };
  