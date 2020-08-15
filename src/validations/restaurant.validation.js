const Joi = require('@hapi/joi');

const addRestaurant = {
  body: Joi.object().keys({
    title: Joi.string()
      .required()
      .min(2)
      .max(100),
    images: Joi.array().items(Joi.object()),
    location: Joi.string(),
    menus: Joi.array().items(Joi.object()),
  }),
};
module.exports = {
  addRestaurant,
};
