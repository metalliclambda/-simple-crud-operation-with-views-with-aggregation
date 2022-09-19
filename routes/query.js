const express = require('express');
const router = express.Router();
const queryController = require('../controllers/query');

router.post('/', queryController.postQuery);
router.post('/city' , queryController.postCity);
router.post('/region' , queryController.postRegion);
router.post('/country' , queryController.postCountry);

module.exports = router;
