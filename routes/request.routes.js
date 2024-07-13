// routes/request.routes.js
const express = require('express');
const router = express.Router();
const requestController = require('../controllers/request.controller');

// Get all requests
router.get('/', requestController.getAllRequests);

// Get request by ID
router.get('/:id', requestController.getRequestById);

// Create new request
router.post('/', requestController.createRequest);

// Update request by ID
router.put('/:id', requestController.updateRequest);

// Delete request by ID
router.delete('/:id', requestController.deleteRequest);

module.exports = router;
