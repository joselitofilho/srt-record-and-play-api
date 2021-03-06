module.exports = {
  type: 'postgres',
  host: 'pgdb',
  port: 15432,
  username: 'postgres',
  password: 'postgres',
  database: 'waving_test',
  migrations: ['dist/migrations/*.js'],
  entities: ['dist/entities/*.entity.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  synchronize: true,
};
