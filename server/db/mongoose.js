var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect( 'mongodb://Abhishek Venkata:abhi0454@ds123171.mlab.com:23171/todoapp');
  // || 'mongodb://localhost:27017/TodoApp');

module.exports = {
  mongoose
}
