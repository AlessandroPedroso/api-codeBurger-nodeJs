module.exports = {
  dialect: 'postgres',
  port: 5434,
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  database: 'codeburger',
  define: {
    timespamps: true,
    underscored: true,
    underscoredAll: true,
  },
}
