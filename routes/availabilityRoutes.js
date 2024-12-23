const express = require('express');
const {
    getAvailableResources,
    bookResource,
    releaseResource,
} = require('../controllers/availabilityController');  // Correctly import the controller functions

const router = express.Router();

router.get('/available', getAvailableResources);  // Endpoint to fetch available resources
router.post('/book', bookResource);  // Endpoint to book a resource
router.post('/release', releaseResource);  // Endpoint to release a resource

module.exports = router;
