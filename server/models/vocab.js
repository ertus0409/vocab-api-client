var mongoose = require('mongoose');

var Vocab = mongoose.model('Vocab', {
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  definition: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

module.exports = {Vocab};
