// controllers/equipment.controller.js
const equipmentModel = require('../models/equipment.model');

exports.getAllEquipment = async (req, res) => {
  try {
    const equipment = await equipmentModel.getAllEquipment();
    res.status(200).json(equipment);
  } catch (error) {
    res.status(500).json({ message: 'Error getting equipment', error });
  }
};

exports.getEquipmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const equipment = await equipmentModel.getEquipmentById(id);
    res.status(200).json(equipment);
  } catch (error) {
    res.status(500).json({ message: 'Error getting equipment', error });
  }
};

exports.createEquipment = async (req, res) => {
  const { name, description, type, status } = req.body;
  try {
    const newEquipment = await equipmentModel.createEquipment({ name, description, type, status });
    res.status(201).json({ message: 'Equipment created successfully', equipment: newEquipment });
  } catch (error) {
    res.status(500).json({ message: 'Error creating equipment', error });
  }
};

exports.updateEquipment = async (req, res) => {
  const { id } = req.params;
  const { name, description, type, status } = req.body;
  try {
    const updatedEquipment = await equipmentModel.updateEquipment(id, { name, description, type, status });
    res.status(200).json({ message: 'Equipment updated successfully', equipment: updatedEquipment });
  } catch (error) {
    res.status(500).json({ message: 'Error updating equipment', error });
  }
};

exports.deleteEquipment = async (req, res) => {
  const { id } = req.params;
  try {
    await equipmentModel.deleteEquipment(id);
    res.status(200).json({ message: 'Equipment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting equipment', error });
  }
};
