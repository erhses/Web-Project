require("dotenv").config();

const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgres://rexlpzst:Vn7zU32D3K29GUpz3HR2crYWLlMRMdg-@satao.db.elephantsql.com/rexlpzst`;

const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString
});

module.exports = {pool};