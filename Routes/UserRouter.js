const express = require('express')
const route = express.Router()
const UserController =require('../Controllers/UserController')

route.post('/register', UserController.Register)
route.post('/login', UserController.Login)

module.exports = route