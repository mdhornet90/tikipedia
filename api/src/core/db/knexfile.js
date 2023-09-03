const common = {
  client: 'postgresql',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: 'tiki',
    user: 'tiki_admin',
    password: 'tiki',
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: 'migrations/beer_alerts',
    stub: 'migrations/stub.ts',
  },
};

module.exports = {
  development: common,
  production: {
    ...common,
    connection: {
      ...common.connection,
      password: process.env.DB_ADMIN_PASSWORD,
    },
  },
};
