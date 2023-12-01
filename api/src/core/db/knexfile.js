const common = {
  client: 'postgresql',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: 'tiki',
    user: 'tiki_admin',
    password: process.env.DB_ADMIN_PASSWORD || 'tiki',
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: 'migrations/tiki',
    stub: 'migrations/stub.ts',
    extension: 'ts',
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
