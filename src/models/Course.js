const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});

module.exports = mongoose.model('Course', courseSchema);
