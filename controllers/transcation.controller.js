// controllers/transaction.controller.js
const transactionModel = require('../models/transaction.model');

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await transactionModel.getAllTransactions();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error getting transactions', error });
  }
};

exports.getTransactionById = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await transactionModel.getTransactionById(id);
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Error getting transaction', error });
  }
};

exports.createTransaction = async (req, res) => {
  const { requestId, transactionDate, status } = req.body;
  try {
    const newTransaction = await transactionModel.createTransaction({ requestId, transactionDate, status });
    res.status(201).json({ message: 'Transaction created successfully', transaction: newTransaction });
  } catch (error) {
    res.status(500).json({ message: 'Error creating transaction', error });
  }
};

exports.updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { requestId, transactionDate, status } = req.body;
  try {
    const updatedTransaction = await transactionModel.updateTransaction(id, { requestId, transactionDate, status });
    res.status(200).json({ message: 'Transaction updated successfully', transaction: updatedTransaction });
  } catch (error) {
    res.status500().json({ message: 'Error updating transaction', error });
  }
};

exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    await transactionModel.deleteTransaction(id);
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting transaction', error });
  }
};
