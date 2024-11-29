const userService = require('../services/userService');

const createUser = async (req, res, next) => {
  const { firstName, lastName } = req.body;
  try {
    const user = await userService.createUser(firstName, lastName);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;
  try {
    const user = await userService.updateUser(id, firstName, lastName);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    await userService.deleteUser(id);
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
