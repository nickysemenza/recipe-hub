var mongoose = require('mongoose');

var ScheduleSchema = new mongoose.Schema({
  recipe: [{ type: mongoose.Schema.ObjectId, ref: 'Recipe' }],
  day: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Schedule', ScheduleSchema);