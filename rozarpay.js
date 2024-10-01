const Razorpay = require("razorpay");
require("dotenv").config();

const razorpayInstance = new Razorpay({
  key_id: "rzp_test_sy0ik5pd9JpjmO",
  key_secret: "BIoxovEsncKbeYcLB7fxGARG",
});

module.exports = razorpayInstance;
