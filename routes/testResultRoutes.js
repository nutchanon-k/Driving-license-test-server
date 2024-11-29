// routes/testResultRoutes.js
const express = require('express');
const router = express.Router();
const testResultController = require('../controllers/testResultController');


router.post('/', testResultController.createTestResult);


router.put('/:userId', testResultController.updateTestResult);


router.get('/', testResultController.getAllTestResults);


router.get('/search', testResultController.searchTestResults);


router.get('/by-user', testResultController.getTestResultByUserId);

module.exports = router;
