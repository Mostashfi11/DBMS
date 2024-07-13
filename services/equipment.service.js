const Equipment = require('../models/equipment.model');

const getAllEquipment = async () => {
  return await Equipment.findAll();
};

const getEquipmentById = async (id) => {
  return await Equipment.findByPk(id);
};

const createEquipment = async (data) => {
  return await Equipment.create(data);
};

const updateEquipment = async (id, data) => {
  const equipment = await Equipment.findByPk(id);
  if (equipment) {
    return await equipment.update(data);
  }
  return null;
};

const deleteEquipment = async (id) => {
  const equipment = await Equipment.findByPk(id);
  if (equipment) {
    await equipment.destroy();
    return true;
  }
  return false;
};

module.exports = {
  getAllEquipment,
  getEquipmentById,
  createEquipment,
  updateEquipment,
  deleteEquipment,
};
