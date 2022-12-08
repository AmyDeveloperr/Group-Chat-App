 const express = require('express');

 const router = express.Router();

 const chatcontroller = require('../controllers/chat');

 const authMiddleware = require('../middleware/auth');

 router.post('/post-chat', authMiddleware.authentication, chatcontroller.postChat);

 router.get('/get-chats', authMiddleware.authentication, chatcontroller.getChats);
 module.exports = router;
