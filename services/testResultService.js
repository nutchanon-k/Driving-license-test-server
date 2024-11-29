
const prisma = require('../configs/prisma');
const evaluateStatus = require('../utils/statusEvaluator');

const createTestResult = async (userId, physicalTestData, theoryTestData, practicalTestData) => {
  // ประเมินผลการทดสอบ
  const { physicalPassed, theoryPassed, practicalPassed } = evaluateStatus(physicalTestData, theoryTestData, practicalTestData);

  // กำหนดสถานะการทดสอบ
  let status = 'PENDING';
  if (physicalPassed && theoryPassed && practicalPassed) {
    status = 'PASSED';
  } else if (!physicalPassed || !theoryPassed || !practicalPassed) {
    status = 'FAILED';
  }

  return await prisma.testResult.create({
    data: {
      userId: parseInt(userId),
      physicalTest: {
        create: {
          colorBlindTest: physicalTestData.colorBlindTest,
          visionLongTest: physicalTestData.visionLongTest,
          visionTiltTest: physicalTestData.visionTiltTest,
          reflexResponseTest: physicalTestData.reflexResponseTest,
          passed: physicalPassed,
        },
      },
      theoryTest: {
        create: {
          trafficSign: theoryTestData.trafficSign,
          trafficLine: theoryTestData.trafficLine,
          rightOfWay: theoryTestData.rightOfWay,
          totalScore: theoryTestData.trafficSign + theoryTestData.trafficLine + theoryTestData.rightOfWay,
          passed: theoryPassed,
        },
      },
      practicalTest: {
        create: {
          passed: practicalPassed,
        },
      },
      status: status,
    },
  });
};

const searchTestResults = async (query) => {
  return await prisma.testResult.findMany({
    where: {
      user: {
        OR: [
          { firstName: { contains: query } },
          { lastName: { contains: query } },
        ],
      },
    },
    include: {
      user: true,
      physicalTest: true,
      theoryTest: true,
      practicalTest: true,
    },
  });
};

const getAllTestResults = async () => {
  return await prisma.testResult.findMany({
    include: {
      user: true,
      physicalTest: true,
      theoryTest: true,
      practicalTest: true,
    },
  });
};

module.exports = {
  createTestResult,
  searchTestResults,
  getAllTestResults,
};
