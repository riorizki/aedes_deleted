// Update with your config settings.

const { knexSnakeCaseMappers } = require('objection');

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      database: 'quest_motors',
      host: '127.0.0.1',
      user: 'root',
      password: null,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: '../migrations',
    },
    ...knexSnakeCaseMappers(),
    debug: false,
  },
  production: {
    client: 'mysql2',
    connection: {
      database: 'quest_motors',
      host: 'quest-db.ck7vjnkk3ixj.ap-southeast-1.rds.amazonaws.com',
      user: 'admin',
      password: 'agus12345',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: '../migrations',
    },
    ...knexSnakeCaseMappers(),
    debug: false,
  },
};
