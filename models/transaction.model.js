// models/transaction.model.js
const oracledb = require('oracledb');

async function getAllTransactions() {
  const sql = `SELECT * FROM transactions`;
  const result = await oracledb.getPool().getConnection().execute(sql);
  return result.rows;
}

async function getTransactionById(id) {
  const sql = `SELECT * FROM transactions WHERE id = :id`;
  const binds = { id };
  const result = await oracledb.getPool().getConnection().execute(sql, binds);
  return result.rows[0];
}

async function createTransaction(transaction) {
  const sql = `INSERT INTO transactions (requestId, transactionDate, status) VALUES (:requestId, :transactionDate, :status)`;
  const binds = { ...transaction };
  const options = { autoCommit: true };
  const result = await oracledb.getPool().getConnection().execute(sql, binds, options);
  return result;
}

async function updateTransaction(id, transaction) {
  const sql = `UPDATE transactions SET requestId = :requestId, transactionDate = :transactionDate, status = :status WHERE id = :id`;
  const binds = { ...transaction, id };
  const options = { autoCommit: true };
  const result = await oracledb.getPool().getConnection().execute(sql, binds, options);
  return result;
}

async function deleteTransaction(id) {
  const sql = `DELETE FROM transactions WHERE id = :id`;
  const binds = { id };
  const options = { autoCommit: true };
  const result = await oracledb.getPool().getConnection().execute(sql, binds, options);
  return result;
}

module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction
};
