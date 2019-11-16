const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
  serialNumber: String,
  description: String,
});
const Taggy = mongoose.model('Taggy', tagSchema);

const authorSchema = mongoose.Schema({
  name: String,
  bio: String,
  website: String,
  taggys: [tagSchema],
});
const Author = mongoose.model('Author', authorSchema);

const courseSchema = mongoose.Schema({
  name: String,
  date: Date,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true,
  },
});
const Course = mongoose.model('Course', courseSchema);

module.exports = {
  Author,
  Course,
  Taggy,
};
