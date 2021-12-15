module.exports = {
  type: 'mysql',
  host: 'db',
  port: 3306,
  username: 'root',
  password: 'klnmdas89312onlfpgadlsvcm',
  database: 'waving_test',
  migrations: ['dist/migrations/*.js'],
  entities: ['dist/entities/*.entity.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  synchronize: true,
};
