var mongoose = require('mongoose');

var RecipeIngredientSchema = new mongoose.Schema({
  ingredient: String,
  substitute: String,
  description: String,
  quantity: Number,
  quantity_endrange: Number,
  quantity_unit: String,
  extras: String,
  grams: Number
});
module.exports = mongoose.model('RecipeIngredient', RecipeIngredientSchema);