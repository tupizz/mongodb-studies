const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/training', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
