
const prisma = require("../configs/prisma");

const createUser = async (firstName, lastName) => {
  return await prisma.user.create({
    data: { firstName, lastName },
  });
};

const getAllUsers = async () => {
  return await prisma.user.findMany({
    include: {
      testResults: true,
    },
  });
};

const updateUser = async (id, firstName, lastName) => {
  return await prisma.user.update({
    where: { id: parseInt(id) },
    data: { firstName, lastName },
  });
};

const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: { id: parseInt(id) },
  });
};

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
