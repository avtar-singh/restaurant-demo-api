const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { restaurantService } = require('../services');
const storage = require('../config/multer');

const create = catchAsync(async (req, res) => {
  const { body } = req;
  const restaurant = await restaurantService.createRestaurant(body);
  res.status(httpStatus.CREATED).send(restaurant);
});

const readAll = catchAsync(async (req, res) => {
  const restaurants = await restaurantService.getRestaurants(req.query);
  res.status(httpStatus.OK).json(restaurants);
});

const readOne = catchAsync(async (req, res) => {
  const restaurant = await restaurantService.getRestaurantById(req.params.id);
  res.status(httpStatus.OK).send(restaurant);
});

const update = catchAsync(async (req, res) => {
  const restaurant = await restaurantService.updateRestaurant(req.params.id, req.body);
  res.send(restaurant);
});

const destroy = catchAsync(async (req, res) => {
  await restaurantService.deleteRestaurant(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const check = catchAsync(async (req, res) => {
  await restaurantService.checkRestaurant(req.query);
  res.status(httpStatus.NO_CONTENT).send();
});

const uploadFile = catchAsync(async (req, res) => {
  const upload = storage.single('file');
  upload(req, res, async function (err) {
    if (err) {
      return res.status(500).send({ error: err });
    }
    const { file } = req;
    res.json(file);
  });
});

const uploadImage = catchAsync(async (req, res) => {
  const upload = storage.single('file');
  upload(req, res, async function(err) {
    if (err) {
      return res.status(500).send({ error: err });
    }
    const { file } = req;
    res.json(file);
  });
});

module.exports = {
  create,
  readAll,
  readOne,
  update,
  destroy,
  check,
  uploadFile,
  uploadImage,
};
