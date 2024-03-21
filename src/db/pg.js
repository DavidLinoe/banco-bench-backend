const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.HOST_PG, // colocar no .env
  port: process.env.PORT_PG,
  database: process.env.DATABASE,
  user: process.env.USER_PG,
  password: process.env.PASSWORD_PG,
});

module.exports = pool;
