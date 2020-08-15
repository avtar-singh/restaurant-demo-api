const express = require('express');
const restaurantsRoute = require('./restaurant.route');

const router = express.Router();

router.use('/restaurants', restaurantsRoute);

module.exports = router;
