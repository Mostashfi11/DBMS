const oracledb = require('oracledb');

async function getAllMessages() {
  const sql = `SELECT * FROM message`;
  const result = await oracledb.getPool().getConnection().execute(sql);
  return result.rows;
}

async function getMessageById(id) {
  const sql = `SELECT * FROM message WHERE id = :id`;
  const binds = { id };
  const result = await oracledb.getPool().getConnection().execute(sql, binds);
  return result.rows[0];
}

async function createMessage(message) {
  const sql = `INSERT INTO message (content, sender, receiver, timestamp) VALUES (:content, :sender, :receiver, :timestamp)`;
  const binds = { ...message };
  const options = { autoCommit: true };
  const result = await oracledb.getPool().getConnection().execute(sql, binds, options);
  return result;
}

async function updateMessage(id, message) {
  const sql = `UPDATE message SET content = :content, sender = :sender, receiver = :receiver, timestamp = :timestamp WHERE id = :id`;
  const binds = { ...message, id };
  const options = { autoCommit: true };
  const result = await oracledb.getPool().getConnection().execute(sql, binds, options);
  return result;
}

async function deleteMessage(id) {
  const sql = `DELETE FROM message WHERE id = :id`;
  const binds = { id };
  const options = { autoCommit: true };
  const result = await oracledb.getPool().getConnection().execute(sql, binds, options);
  return result;
}

module.exports = {
  getAllMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage
};
