// models/request.model.js
const oracledb = require('oracledb');

async function getAllRequests() {
  const sql = `SELECT * FROM requests`;
  const result = await oracledb.getPool().getConnection().execute(sql);
  return result.rows;
}

async function getRequestById(id) {
  const sql = `SELECT * FROM requests WHERE id = :id`;
  const binds = { id };
  const result = await oracledb.getPool().getConnection().execute(sql, binds);
  return result.rows[0];
}

async function createRequest(request) {
  const sql = `INSERT INTO requests (userId, equipmentId, requestDate, returnDate, status) VALUES (:userId, :equipmentId, :requestDate, :returnDate, :status)`;
  const binds = { ...request };
  const options = { autoCommit: true };
  const result = await oracledb.getPool().getConnection().execute(sql, binds, options);
  return result;
}

async function updateRequest(id, request) {
  const sql = `UPDATE requests SET userId = :userId, equipmentId = :equipmentId, requestDate = :requestDate, returnDate = :returnDate, status = :status WHERE id = :id`;
  const binds = { ...request, id };
  const options = { autoCommit: true };
  const result = await oracledb.getPool().getConnection().execute(sql, binds, options);
  return result;
}

async function deleteRequest(id) {
  const sql = `DELETE FROM requests WHERE id = :id`;
  const binds = { id };
  const options = { autoCommit: true };
  const result = await oracledb.getPool().getConnection().execute(sql, binds, options);
  return result;
}

module.exports = {
  getAllRequests,
  getRequestById,
  createRequest,
  updateRequest,
  deleteRequest
};
