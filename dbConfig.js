const { Pool } = require("pg");

const connectionString = `postgres://rexlpzst:Vn7zU32D3K29GUpz3HR2crYWLlMRMdg-@satao.db.elephantsql.com/rexlpzst`;

const pool = new Pool({
    connectionString
});

module.exports = {pool};