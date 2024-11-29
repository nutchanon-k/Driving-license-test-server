// controllers/testResultController.js
const testResultService = require('../services/testResultService');

const createTestResult = async (req, res, next) => {
    const { userId, physicalTest, theoryTest, practicalTest } = req.body;
    try {
      const testResult = await testResultService.createTestResult(userId, physicalTest, theoryTest, practicalTest);
      res.json(testResult);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
  
  const updateTestResult = async (req, res, next) => {
    const { userId } = req.params;
    const { physicalTest, theoryTest, practicalTest } = req.body;
    try {
      const updatedTestResult = await testResultService.updateTestResult(userId, physicalTest, theoryTest, practicalTest);
      res.json(updatedTestResult);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
  
  const searchTestResults = async (req, res, next) => {
    const { query } = req.query;
    try {
      const results = await testResultService.searchTestResults(query);
      res.json(results);
    } catch (error) {
      next(error);
    }
  };
  
  const getAllTestResults = async (req, res, next) => {
    try {
      const results = await testResultService.getAllTestResults();
      res.json(results);
    } catch (error) {
      next(error);
    }
  };
  
  const getTestResultByUserId = async (req, res, next) => {
    const { userId } = req.query;
    try {
      const testResult = await testResultService.getTestResultByUserId(userId);
      if (testResult) {
        res.json(testResult);
      } else {
        next(error);
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
  
  module.exports = {
    createTestResult,
    updateTestResult,
    searchTestResults,
    getAllTestResults,
    getTestResultByUserId,
  };