'use strict';
module.exports = function(app) {
  var user = require ('../controllers/userController');

  app.route('/users')
    .get(user.getAllUsers)
    .post(user.createUser)

  app.route('/users/:id')
    .get(user.getUser)
    .put(user.updateUser)
    .delete(user.deleteUser)
};	
