module.exports = {
  type: 'postgres',
  host: 'studasso-database',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'studasso',
  entities: [__dirname + './**/*.entity{.ts,.js}'],
  cli: {
    migrationsDir: 'libs/backend/core/migrations/src/lib',
  },
};
