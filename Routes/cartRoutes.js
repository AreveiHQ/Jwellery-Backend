const express = require('express');
const router = express.Router();
const { createCart, addToCart, removeProductCart, getCart, getCartPrice } = require('../Controller/cartController');
const { userAuth } = require('../Middleware/userAuth');

// Route to create a cart
router.post('/create', userAuth, createCart);

// Route to add a product to the cart
router.post('/add', userAuth, addToCart);

// Route to remove a product from the cart
router.delete('/remove', userAuth, removeProductCart);

// Route to get the cart
router.get('/', userAuth, getCart);
router.get('/details',userAuth,getCartPrice);

module.exports = router;
