
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
          update: { // เปลี่ยนจาก create เป็น update ถ้า TestResult ถูกสร้างขึ้นมาแล้ว
            colorBlindTest: physicalTestData.colorBlindTest,
            visionLongTest: physicalTestData.visionLongTest,
            visionTiltTest: physicalTestData.visionTiltTest,
            reflexResponseTest: physicalTestData.reflexResponseTest,
            passed: physicalPassed,
          },
        },
        theoryTest: {
          update: { // เปลี่ยนจาก create เป็น update ถ้า TestResult ถูกสร้างขึ้นมาแล้ว
            trafficSign: theoryTestData.trafficSign,
            trafficLine: theoryTestData.trafficLine,
            rightOfWay: theoryTestData.rightOfWay,
            totalScore: theoryTestData.trafficSign + theoryTestData.trafficLine + theoryTestData.rightOfWay,
            passed: theoryPassed,
          },
        },
        practicalTest: {
          update: { // เปลี่ยนจาก create เป็น update ถ้า TestResult ถูกสร้างขึ้นมาแล้ว
            passed: practicalPassed,
          },
        },
        status: status,
      },
      include: {
        physicalTest: true,
        theoryTest: true,
        practicalTest: true,
      },
    });
  };
  
  const updateTestResult = async (userId, physicalTestData, theoryTestData, practicalTestData) => {
    // ประเมินผลการทดสอบ
    const { physicalPassed, theoryPassed, practicalPassed } = evaluateStatus(physicalTestData, theoryTestData, practicalTestData);
  
    // กำหนดสถานะการทดสอบ
    let status = 'PENDING';
    if (physicalPassed && theoryPassed && practicalPassed) {
      status = 'PASSED';
    } else if (!physicalPassed || !theoryPassed || !practicalPassed) {
      status = 'FAILED';
    }
  
    return await prisma.testResult.update({
      where: {
        userId: parseInt(+userId),
      },
      data: {
        physicalTest: {
          update: {
            colorBlindTest: physicalTestData.colorBlindTest,
            visionLongTest: physicalTestData.visionLongTest,
            visionTiltTest: physicalTestData.visionTiltTest,
            reflexResponseTest: physicalTestData.reflexResponseTest,
            passed: physicalPassed,
          },
        },
        theoryTest: {
          update: {
            trafficSign: theoryTestData.trafficSign,
            trafficLine: theoryTestData.trafficLine,
            rightOfWay: theoryTestData.rightOfWay,
            totalScore: theoryTestData.trafficSign + theoryTestData.trafficLine + theoryTestData.rightOfWay,
            passed: theoryPassed,
          },
        },
        practicalTest: {
          update: {
            passed: practicalPassed,
          },
        },
        status: status,
      },
      include: {
        physicalTest: true,
        theoryTest: true,
        practicalTest: true,
      },
    });
  };
  
  const searchTestResults = async (query) => {
    return await prisma.testResult.findMany({
      where: {
        user: {
          OR: [
            { firstName: { contains: query} },
            { lastName: { contains: query} },
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
  
  const getTestResultByUserId = async (userId) => {
    return await prisma.testResult.findFirst({
      where: {
        userId: parseInt(userId),
      },
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
    updateTestResult,
    getTestResultByUserId,
    searchTestResults,
    getAllTestResults,
  };