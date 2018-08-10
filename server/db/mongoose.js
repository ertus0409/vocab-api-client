var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(('mongodb://localhost:27017/SmartDictionary' || process.env.MONGODB_URI), {useNewUrlParser: true});

module.exports = {mongoose};
