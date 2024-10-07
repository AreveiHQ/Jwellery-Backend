const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orders: [
    {
      items: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
          },
          quantity: Number,
        },
      ],
      paymentStatus: String,
      paymentId: String,
      address: String,
      orderStatus: String,
      amount: Number,
      signature: String,
      orderId: String,
    },
  ],
});
const Order=mongoose.model('Order', orderSchema);

module.exports = Order;
