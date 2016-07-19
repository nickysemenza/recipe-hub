var mongoose = require('mongoose');

var ScheduleSchema = new mongoose.Schema({
  recipe: [{info: { type: mongoose.Schema.ObjectId, ref: 'Recipe' }, quantity: { type: Number, default: 1 }}],
  day: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Schedule', ScheduleSchema);