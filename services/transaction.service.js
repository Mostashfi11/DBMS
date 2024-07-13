const Maintenance = require('../models/maintenance.model');

const getAllMaintenanceTasks = async () => {
  return await Maintenance.findAll();
};

const getMaintenanceTaskById = async (id) => {
  return await Maintenance.findByPk(id);
};

const createMaintenanceTask = async (data) => {
  return await Maintenance.create(data);
};

const updateMaintenanceTask = async (id, data) => {
  const task = await Maintenance.findByPk(id);
  if (task) {
    return await task.update(data);
  }
  return null;
};

const deleteMaintenanceTask = async (id) => {
  const task = await Maintenance.findByPk(id);
  if (task) {
    await task.destroy();
    return true;
  }
  return false;
};

module.exports = {
  getAllMaintenanceTasks,
  getMaintenanceTaskById,
  createMaintenanceTask,
  updateMaintenanceTask,
  deleteMaintenanceTask,
};
