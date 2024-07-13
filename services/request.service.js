const Inventory = require('../models/inventory.model');

const getAllInventoryItems = async () => {
  return await Inventory.findAll();
};

const getInventoryItemById = async (id) => {
  return await Inventory.findByPk(id);
};

const createInventoryItem = async (data) => {
  return await Inventory.create(data);
};

const updateInventoryItem = async (id, data) => {
  const item = await Inventory.findByPk(id);
  if (item) {
    return await item.update(data);
  }
  return null;
};

const deleteInventoryItem = async (id) => {
  const item = await Inventory.findByPk(id);
  if (item) {
    await item.destroy();
    return true;
  }
  return false;
};

module.exports = {
  getAllInventoryItems,
  getInventoryItemById,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
};
