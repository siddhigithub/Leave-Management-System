const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const dbUrl = new URL(process.env.DATABASE_URL);

const pool = mysql.createPool({
  host: dbUrl.hostname,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.slice(1),
  port: dbUrl.port || 3306,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool.promise();