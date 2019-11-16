const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
  },
  category: {
    type: String,
    enum: ['web', 'mobile', 'network'],
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'A course should have at least one tag.',
    },
  },
  date: Date,
  isPublished: Boolean,
  price: {
    type: Number,
    get: v => Math.round(v),
    set: v => Math.round(v),
    validate: {
      validator: function(v) {
        return new Promise(resolve => {
          setTimeout(() => {
            if (v === null) {
              resolve(false);
            }

            if (!this.isPublished && v) {
              resolve(false);
            }

            if (v && v <= 3.55) {
              resolve(false);
            }

            resolve(true);
          }, 1000);
        });
      },
      message: 'Price is not well formatted',
    },
  },
});

module.exports = mongoose.model('CourseWithValidation', courseSchema);
