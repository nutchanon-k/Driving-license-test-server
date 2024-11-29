const express = require('express');
const router = express.Router();
const testResultController = require('../controllers/testResultController');


router.post('/', testResultController.createTestResult);

router.get('/', testResultController.getAllTestResults);

router.get('/search', testResultController.searchTestResults);

module.exports = router;
