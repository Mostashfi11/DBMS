// models/equipment.model.js
const oracledb = require('oracledb');

async function getAllEquipment() {
  const sql = `SELECT * FROM equipment`;
  const result = await oracledb.getPool().getConnection().execute(sql);
  return result.rows;
}

async function getEquipmentById(id) {
  const sql = `SELECT * FROM equipment WHERE id = :id`;
  const binds = { id };
  const result = await oracledb.getPool().getConnection().execute(sql, binds);
  return result.rows[0];
}

async function createEquipment(equipment) {
  const sql = `INSERT INTO equipment (name, description, type, status) VALUES (:name, :description, :type, :status)`;
  const binds = { ...equipment };
  const options = { autoCommit: true };
  const result = await oracledb.getPool().getConnection().execute(sql, binds, options);
  return result;
}

async function updateEquipment(id, equipment) {
  const sql = `UPDATE equipment SET name = :name, description = :description, type = :type, status = :status WHERE id = :id`;
  const binds = { ...equipment, id };
  const options = { autoCommit: true };
  const result = await oracledb.getPool().getConnection().execute(sql, binds, options);
  return result;
}

async function deleteEquipment(id) {
  const sql = `DELETE FROM equipment WHERE id = :id`;
  const binds = { id };
  const options = { autoCommit: true };
  const result = await oracledb.getPool().getConnection().execute(sql, binds, options);
  return result;
}

module.exports = {
  getAllEquipment,
  getEquipmentById,
  createEquipment,
  updateEquipment,
  deleteEquipment
};
