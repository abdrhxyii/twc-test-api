const express = require('express');
const route = express.Router();
const ContactController = require('../Controllers/ContactController');
const AuthMiddleware = require('../Middleware/AuthMiddleware')

route.post("/contacts", AuthMiddleware.authenticateToken, ContactController.CreateContact);
route.get('/contacts', ContactController.GetAllContacts)
route.put("/contacts/:id",AuthMiddleware.authenticateToken, ContactController.UpdateContact);
route.delete("/contacts/:id",AuthMiddleware.authenticateToken, ContactController.DeleteContact);

module.exports = route