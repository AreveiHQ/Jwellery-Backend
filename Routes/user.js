const express = require('express');
const router = express.Router();
const userController = require("../Controller/userController");
const { userAuth } = require('../Middleware/userAuth');
const { requestOTP, verifyOTP, forgotPassword, resetPassword } = require('../Controller/authController');

router.post("/signup",userController.createUser);
router.post("/signin",userController.loginUser);

router.get("/profile",userAuth,userController.userProfile);
router.post("/address",userAuth,userController.addAddress);
router.get("/address",userAuth,userController.getAddress);

router.post('/request-otp', requestOTP)
router.post('/verify-otp', verifyOTP)


module.exports = router;