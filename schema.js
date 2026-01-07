const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().min(0).required(),

    // ✅ EXACT SAME 8 CATEGORIES
    category: Joi.string()
      .valid(
        "rooms",
        "cities",
        "mountains",
        "castles",
        "pools",
        "camping",
        "farms",
        "boats"
      )
      .required(),

    image: Joi.any()
  }).required()
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().required()
  }).required()
});
