const { Pool } = require('pg');
 
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'banco-bench',
  user: 'CucaPost',
  password: '3*Cuc4x!z-$0',

})
module.exports = pool;