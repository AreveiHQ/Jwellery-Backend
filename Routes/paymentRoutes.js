const express = require("express");
const { createOrder, verifyPayment,DownloadReciept } = require("../Controller/paymentController");
const { userAuth } = require("../Middleware/userAuth");

const router = express.Router();

router.post("/order", userAuth, createOrder);
router.post("/verify", userAuth, verifyPayment);
router.get("/download", userAuth, DownloadReciept);
module.exports = router;
