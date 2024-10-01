
const Order = require('../model/orderModel');
const Cart = require('../model/cartModel');

// Create an Order
exports.createOrder = async (req, res) => {
  try {
    const { paymentId, address, amount, orderId,signature } = req.body;

    // Fetch items from the user's cart
    const userId = req.userId;
    const cartItems = await Cart.findOne({ userId: userId });

    if (!cartItems) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    let order = await Order.findOne({ userId });
    if (!order) {
      order = new Order({ userId, orders: [] });
    }

    order.orders.push({
      items: cartItems,
      paymentStatus: 'confirmed',
      paymentId,
      address,
      orderStatus: 'confirmed',
      amount: amount,
      signature,
      orderId
    })


    await order.save();

    await Cart.findOneAndDelete({userId});

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ userId });

    if (!orders) {
      return res.status(404).json({ message: 'No orders found' });
    }

    res.status(200).json({
      orders
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Order Status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findOneAndUpdate(
      { 'orders._id': orderId },
      { $set: { 'orders.$.orderStatus': status } },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
