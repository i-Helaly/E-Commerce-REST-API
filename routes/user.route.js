const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const bodyOfUserValidation = require('../middlewares/userValidation');
const resOfValidation = require('../middlewares/resultValidation');


router.get('/api/user' , userController.getUsers)
router.get('/api/user/:id' , userController.getUser)
router.post('/api/user' ,bodyOfUserValidation ,resOfValidation ,userController.createUser)
router.patch('/api/user/:id' , userController.updateUser)
router.delete('/api/user/:id' , userController.deleteUser)

module.exports = router;