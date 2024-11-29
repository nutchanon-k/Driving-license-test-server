
const prisma = require("../configs/prisma");


const createUser = async (firstName, lastName) => {
    return await prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: { firstName, lastName },
      });
  
      // สร้าง TestResult พร้อมกับ PhysicalTest, TheoryTest, PracticalTest ด้วยค่าเริ่มต้น
      await prisma.testResult.create({
        data: {
          userId: user.id,
          status: 'PENDING',
          physicalTest: {
            create: {
              colorBlindTest: false,
              visionLongTest: false,
              visionTiltTest: false,
              reflexResponseTest: false,
              passed: false, // ค่าเริ่มต้น
            },
          },
          theoryTest: {
            create: {
              trafficSign: 0,
              trafficLine: 0,
              rightOfWay: 0,
              totalScore: 0,
              passed: false, // ค่าเริ่มต้น
            },
          },
          practicalTest: {
            create: {
              passed: false, // ค่าเริ่มต้น
            },
          },
        },
      });
  
      return user;
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