
const evaluateStatus = (physicalTest, theoryTest, practicalTest) => {
    // ประเมินผลการทดสอบร่างกาย
    const physicalPassed = 
      [physicalTest.colorBlindTest, physicalTest.visionLongTest, physicalTest.visionTiltTest, physicalTest.reflexResponseTest].filter(Boolean).length >= 3;
  
    // ประเมินผลการทดสอบทฤษฎี
    const theoryTotal = (theoryTest.trafficSign || 0) + (theoryTest.trafficLine || 0) + (theoryTest.rightOfWay || 0);
    const theoryPassed = (theoryTotal / 150) > 0.8; // 80% จาก 150 คะแนน
  
    // ประเมินผลการทดสอบปฏิบัติ
    const practicalPassed = practicalTest.passed;
  
    return { physicalPassed, theoryPassed, practicalPassed };
  };
  
  module.exports = evaluateStatus;

  