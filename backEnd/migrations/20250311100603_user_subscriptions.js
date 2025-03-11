exports.up = function(knex) {
    return knex.schema.createTable('user_subscriptions', function(table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned();
      table.enum('platform', ['LeetCode', 'Codeforces', 'CodeChef', 'AtCoder', 'HackerRank']);
      table.boolean('subscribed').defaultTo(false);
      
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('user_subscriptions');
  };
  