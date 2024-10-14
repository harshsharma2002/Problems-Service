// Update with your config settings.
require("./envloader").initializeENV();
const { knexSnakeCaseMappers } = require("objection");

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const dbConfig = {
  client: process.env.PGCLIENT,
  connection: {
    host: process.env.PGHOST,
    database: process.env.PGNAME,
    user: process.env.PGUSERNAME,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    ...(process.env.PGSSL === "true" && {
      ssl: { rejectUnauthorized: false },
    }),
  },
  migrations: {
    tableName: process.env.PGMIGRATION_TABLE,
  },
  ...knexSnakeCaseMappers(),
};

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: dbConfig,
  production: dbConfig,
  dbConfig,
};
