const express = require('express');
const userController = require('../controllers/user.controller.js');
const { registerValidation, loginValidation } = require('../validators/authValidator.js');
const authenticate = require('../middlewares/authenticate.js');
const router = express.Router();

router.post('/login', loginValidation, userController.userLogin);

router.post('/register', registerValidation, userController.userRegister);

router.post('/logout', authenticate, userController.userLogout);

router.get('/me', authenticate, userController.me);

module.exports = router;