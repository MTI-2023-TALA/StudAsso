module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'studasso',
  entities: [__dirname + './**/*.entity{.ts,.js}'],
  migrations: ['libs/backend/core/migrations/src/lib/*.ts'],
  cli: {
    migrationsDir: 'libs/backend/core/migrations/src/lib',
  },
};