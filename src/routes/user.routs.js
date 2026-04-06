const express = require('express');
const routes = express.Router();
const user_controller = require("../controller/user.controller");



routes.get('/', user_controller.getAllPosts)
routes.post('/', user_controller.createPost);
routes.put('/:id', user_controller.updatePost);
routes.delete('/:id', user_controller.deletePost);

module.exports = routes;