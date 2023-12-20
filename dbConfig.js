require("dotenv").config();

const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://erhses:passwd@localhost:5432/nodelogin`;

const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString
});

module.exports = {pool};