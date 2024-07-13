// controllers/request.controller.js
const requestModel = require('../models/request.model');

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await requestModel.getAllRequests();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error getting requests', error });
  }
};

exports.getRequestById = async (req, res) => {
  const { id } = req.params;
  try {
    const request = await requestModel.getRequestById(id);
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: 'Error getting request', error });
  }
};

exports.createRequest = async (req, res) => {
  const { userId, equipmentId, requestDate, returnDate, status } = req.body;
  try {
    const newRequest = await requestModel.createRequest({ userId, equipmentId, requestDate, returnDate, status });
    res.status(201).json({ message: 'Request created successfully', request: newRequest });
  } catch (error) {
    res.status(500).json({ message: 'Error creating request', error });
  }
};

exports.updateRequest = async (req, res) => {
  const { id } = req.params;
  const { userId, equipmentId, requestDate, returnDate, status } = req.body;
  try {
    const updatedRequest = await requestModel.updateRequest(id, { userId, equipmentId, requestDate, returnDate, status });
    res.status(200).json({ message: 'Request updated successfully', request: updatedRequest });
  } catch (error) {
    res.status(500).json({ message: 'Error updating request', error });
  }
};

exports.deleteRequest = async (req, res) => {
  const { id } = req.params;
  try {
    await requestModel.deleteRequest(id);
    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting request', error });
  }
};
