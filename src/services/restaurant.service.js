const httpStatus = require('http-status');
const { pick } = require('lodash');
const AppError = require('../utils/AppError');
const { Restaurant } = require('../models');
const { getQueryOptions } = require('../utils/service.util');

// Check If Restaruant Already Exists
const checkRestaurant = async query => {
  // Case Insensitive
  let name = `^${query}$`;
  const restaurant = await Restaurant.findOne({ title: { $regex: name, $options: 'i' } });
  if (restaurant) {
    throw new AppError(httpStatus.NOT_FOUND, 'Restaurant with the same name already exists.');
  }
};

// Create New Restaurant
const createRestaurant = async restaurantBody => {
  // Check If Restaurant with Same Name Exists
  await checkRestaurant(restaurantBody.title);
  // Create New Restaurant
  const restaurant = await Restaurant.create(restaurantBody);
  return restaurant;
};

// Get All Restaurants
const getRestaurants = async query => {
  const filter = pick(query, ['title', 'location']);
  const options = getQueryOptions(query);
  const restaurants = await Restaurant.find(filter, null, options);
  return restaurants;
};

// Get Restaurant By Id
const getRestaurantById = async restaurantId => {
  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) {
    throw new AppError(httpStatus.NOT_FOUND, 'Restaurant not found');
  }
  return restaurant;
};

// Update Restaurant
const updateRestaurant = async (restaurantId, updateBody) => {
  const restaurant = await getRestaurantById(restaurantId);
  Object.assign(restaurant, updateBody);
  await restaurant.save();
  return restaurant;
};

// Delete Restaurant
const deleteRestaurant = async restaurantId => {
  const restaurant = await getRestaurantById(restaurantId);
  await restaurant.delete();
  return restaurant;
};

module.exports = {
  checkRestaurant,
  getRestaurants,
  createRestaurant,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
};
