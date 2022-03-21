module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'studasso',
  entities: [__dirname + './**/*.entity{.ts,.js}'],
  migrations: ['tools/migrations/*.ts'],
  cli: {
    migrationsDir: 'apps/backend/src/migrations',
  },
};
