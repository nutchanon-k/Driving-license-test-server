const testResultService = require('../services/testResultService');

const createTestResult = async (req, res) => {
  const { userId, physicalTest, theoryTest, practicalTest } = req.body;
  try {
    const testResult = await testResultService.createTestResult(userId, physicalTest, theoryTest, practicalTest);
    res.json(testResult);
  } catch (error) {
    next(error);
  }
};

const searchTestResults = async (req, res) => {
  const { query } = req.query;
  try {
    const results = await testResultService.searchTestResults(query);
    res.json(results);
  } catch (error) {
    next(error);
  }
};

const getAllTestResults = async (req, res) => {
  try {
    const results = await testResultService.getAllTestResults();
    res.json(results);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTestResult,
  searchTestResults,
  getAllTestResults,
};
