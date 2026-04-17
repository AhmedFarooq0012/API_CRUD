const express = require('express');
const routes = express.Router();
const user_controller = require("../controller/registeruser");
const verifyToken = require("../middleware/jwtwebtoken");


routes.get('/', user_controller.getAllUsers)
// routes.get('/all',user_controller.getAllUsers)

routes.post('/register', user_controller.register_user);
routes.get('/all', verifyToken, user_controller.getAllUsers);

routes.post('/login',user_controller.login_user)

module.exports = routes;