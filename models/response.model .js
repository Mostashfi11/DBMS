const oracledb = require('oracledb');

async function getAllResponses() {
  const sql = `SELECT * FROM response`;
  const result = await oracledb.getPool().getConnection().execute(sql);
  return result.rows;
}

async function getResponseById(id) {
  const sql = `SELECT * FROM response WHERE id = :id`;
  const binds = { id };
  const result = await oracledb.getPool().getConnection().execute(sql, binds);
  return result.rows[0];
}

async function createResponse(response) {
  const sql = `INSERT INTO response (content, messageId, timestamp) VALUES (:content, :messageId, :timestamp)`;
  const binds = { ...response };
  const options = { autoCommit: true };
  const result = await oracledb.getPool().getConnection().execute(sql, binds, options);
  return result;
}

async function updateResponse(id, response) {
  const sql = `UPDATE response SET content = :content, messageId = :messageId, timestamp = :timestamp WHERE id = :id`;
  const binds = { ...response, id };
  const options = { autoCommit: true };
  const result = await oracledb.getPool().getConnection().execute(sql, binds, options);
  return result;
}

async function deleteResponse(id) {
  const sql = `DELETE FROM response WHERE id = :id`;
  const binds = { id };
  const options = { autoCommit: true };
  const result = await oracledb.getPool().getConnection().execute(sql, binds, options);
  return result;
}

module.exports = {
  getAllResponses,
  getResponseById,
  createResponse,
  updateResponse,
  deleteResponse
};
