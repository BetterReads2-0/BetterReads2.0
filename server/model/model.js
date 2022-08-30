const { Pool } = require('pg')
require('dotenv').config();

const PG_URI = process.env.DB_URL;
console.log('URI:', PG_URI)

const pool = new Pool({
    connectionString: PG_URI
  });

module.exports = {
query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
}
};