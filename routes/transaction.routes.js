// routes/transaction.routes.js
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction.controller');

// Get all transactions
router.get('/', transactionController.getAllTransactions);

// Get transaction by ID
router.get('/:id', transactionController.getTransactionById);

// Create new transaction
router.post('/', transactionController.createTransaction);

// Update transaction by ID
router.put('/:id', transactionController.updateTransaction);

// Delete transaction by ID
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;
