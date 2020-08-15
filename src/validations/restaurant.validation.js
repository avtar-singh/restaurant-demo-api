const Joi = require('@hapi/joi');

const addRestaurant = {
  body: Joi.object().keys({
    title: Joi.string()
      .required()
      .min(2)
      .max(100),
    image: Joi.string(),
    location: Joi.string(),
    menus: Joi.array().items(Joi.object()),
  }),
};
module.exports = {
  addRestaurant,
};
