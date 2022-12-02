const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

const chatcontroller = require('../controllers/message');

const userauthenticate = require('../middleware/auth')


router.post('/signup', userController.signunp);

router.post('/login', userController.login);

router.post('/chatsstart',userauthenticate.authentication,chatcontroller.userMessage)

router.get('/getchats' , userauthenticate.authentication , chatcontroller.getMessage)


module.exports = router;