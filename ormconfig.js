module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'record_and_play',
  migrations: ['dist/migrations/*.js'],
  entities: ['dist/entities/*.entity.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  synchronize: false,
};