const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/auth');
const groupController = require('../controllers/group');

router.post('/create-group', authMiddleware.authentication,groupController.createGroup);

router.get('/get-groups', authMiddleware.authentication, groupController.getGroups);

router.delete('/delete-group/:gId', authMiddleware.authentication, groupController.deleteGroup);

router.post('/add-user', authMiddleware.authentication, groupController.addUserToGroup);

router.get('/get-users', authMiddleware.authentication, groupController.getUsers);

router.post('/make-admin', authMiddleware.authentication, groupController.makeAdmin);

router.post('/remove-user', authMiddleware.authentication, groupController.removeUser);

module.exports = router;