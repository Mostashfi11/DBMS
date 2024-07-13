// models/user.model.js
const oracledb = require('oracledb');

async function createUser(user) {
  const sql = `INSERT INTO users (username, email, password) VALUES (:username, :email, :password)`;
  const binds = { ...user };
  const options = { autoCommit: true };
  const result = await oracledb.getPool().getConnection().execute(sql, binds, options);
  return result;
}

async function findUserByEmail(email) {
  const sql = `SELECT * FROM users WHERE email = :email`;
  const binds = { email };
  const result = await oracledb.getPool().getConnection().execute(sql, binds);
  return result.rows[0];
}

module.exports = {
  createUser,
  findUserByEmail
};
