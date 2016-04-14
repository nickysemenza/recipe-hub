var mongoose = require('mongoose');

var RecipeSchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  photo: String,
  serves: Number,
  makes_quantity: Number,
  makes_noun: String,
  time_total: String,
  time_details: String,
  original_source: String,
  tags: [String],
  icons: [String],
  tools: [String],
  sections_ingredients: [
                          {
                            title: String,
                            ingredients: 
                            [
                                {
                                  ingredient: String,
                                  substitute: String,
                                  description: String,
                                  quantity: Number,
                                  quantity_endrange: Number,
                                  quantity_unit: String,
                                  extras: String,
                                  grams: Number
                                }
                            ]
                          }
                        ],
  sections_instructions: [{title: String, body: [String]}],
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Recipe', RecipeSchema);