const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/auth');
const groupController = require('../controllers/group');

router.post('/create-group', authMiddleware.authentication,groupController.createGroup);

router.get('/get-groups', authMiddleware.authentication, groupController.getGroups);

module.exports = router;