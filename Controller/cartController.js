const Cart = require('../model/cartModel');

// Create a new cart for a user
const createCart = async (req, res) => {
    const { userId } = req.user;
    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
            await cart.save();
        }
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Server error while creating cart' });
    }
};

// Add a product to the cart
const addToCart = async (req, res) => {
    const userId = req.userId;
    const { productId, img_src, name, price, quantity } = req.body;

    try {
    //    console.log(productId,name,price,quantity,userId);
       
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (itemIndex > -1) {
            
            cart.items[itemIndex].quantity += quantity;
        } else {
           
            cart.items.push({ productId, img_src, name, price, quantity });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.json({ error: 'Server error while adding to cart' });
    }
};

// Remove a product from the cart
const removeProductCart = async (req, res) => {
    const userId = req.userId;
    const { productId } = req.body;
    console.log(userId,productId)
    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Server error while removing product from cart' });
    }
};

// Get the cart for a user
const getCart = async (req, res) => {
    const userId = req.userId;

    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Server error while fetching cart' });
    }
};

const getCartPrice = async (req,res)=>{
    const userId=req.userId;
    try{
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const items = cart.items;
        const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
        res.json({
            total
        })
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {
    createCart,
    addToCart,
    removeProductCart,
    getCart,
    getCartPrice
};
