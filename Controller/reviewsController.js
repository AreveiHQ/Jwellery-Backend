const Product = require("../model/productModel");

const createReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({message: 'Product not found'})
        }

        const review = {
            user: req.userId,
            rating: Number(rating),
            comment,
        }

        product.reviews.push(review);

        //average rating and num of rating
        product.numReviews = product.reviews.length;
        product.averageRating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

        await product.save();

        res.status(201).json({ message: 'Review added successfully', product });


    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const allReviews = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('reviews.user', 'name');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product.reviews);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = {
    allReviews, createReview
}