require('dotenv').config();

console.log("dsfgsdfg",process.env.DB_URL);

module.exports = {
  "migrationDirectory": "migrations",
  "driver": "pg",
  "connectionString": process.env.DB_URL,
}
