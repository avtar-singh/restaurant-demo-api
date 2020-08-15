const express = require('express');
const restaurantController = require('../../controllers/restaurant.controller');
const validate = require('../../middlewares/validate');
const restaurantValidation = require('../../validations/restaurant.validation');

const router = express.Router();

// Check If Restaurant Already Exists
router.route('/check').get(restaurantController.check);

// GET List of Restaurants
// POST Restaurant
router
  .route('/')
  .get(restaurantController.readAll)
  .post(validate(restaurantValidation.addRestaurant), restaurantController.create);

// GET, PUT & DELETE Restaurant
router
  .route('/:id')
  .get(restaurantController.readOne)
  .put(restaurantController.update)
  .delete(restaurantController.destroy);

// Upload Restaurant Images
router.post('/uploadImages', restaurantController.uploadImages);

// Upload Restaurant Video
router.post('/uploadVideo', restaurantController.uploadFile);

module.exports = router;
