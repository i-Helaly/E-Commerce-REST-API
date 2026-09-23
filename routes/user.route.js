const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const bodyOfUserValidation = require('../middlewares/userValidation');
const resOfValidation = require('../middlewares/resultValidation');
const authenticate = require('../middlewares/authentication');
const role = require('../middlewares/role');
const verifyToken = require("../middlewares/verifyToken")
const roleBasedAuth = require("../middlewares/rolebasedAuth")

router.get('/api/user' ,verifyToken, roleBasedAuth("admin"), userController.getUsers)
router.get('/api/user/:id' , verifyToken, roleBasedAuth("admin" , "user"), userController.getUser)
router.post('/api/user' ,bodyOfUserValidation ,resOfValidation , verifyToken, roleBasedAuth("admin"), userController.createUser)
router.patch('/api/user/:id' , verifyToken, roleBasedAuth("admin" , "user"), userController.updateUser)
router.delete('/api/user/:id' ,verifyToken, roleBasedAuth("admin"),  userController.deleteUser)

module.exports = router;