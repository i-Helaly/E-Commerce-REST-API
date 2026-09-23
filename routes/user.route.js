const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const bodyOfUserValidation = require('../middlewares/userValidation');
const resOfValidation = require('../middlewares/resultValidation');
const authenticate = require('../middlewares/authentication');
const role = require('../middlewares/role');
const verifyToken = require("../middlewares/verifyToken")


router.get('/api/user' ,verifyToken, userController.getUsers)
router.get('/api/user/:id' , authenticate, role("admin" , "user"), userController.getUser)
router.post('/api/user' ,bodyOfUserValidation ,resOfValidation , authenticate, role("admin"), userController.createUser)
router.patch('/api/user/:id' , authenticate, role("admin" , "user"), userController.updateUser)
router.delete('/api/user/:id' ,authenticate, role("admin"),  userController.deleteUser)

module.exports = router;