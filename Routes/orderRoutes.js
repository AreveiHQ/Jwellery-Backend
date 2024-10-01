
const express = require('express');
const router = express.Router();
const { createOrder, getOrders, updateOrderStatus } = require('../Controller/orderController');
const {userAuth} = require('../Middleware/userAuth'); 

// Route to create an order
router.post('/', userAuth, createOrder);

// Route to get all orders for a user
router.get('/', userAuth, getOrders);

// Route to update order status
router.put('/:orderId', userAuth, updateOrderStatus);

module.exports = router;
