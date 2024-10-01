const mongoose = require('mongoose');
const subCategories = {
  men: ['shirts', 'trousers', 'shoes'],
  women: ['dresses', 'handbags', 'shoes'],
  kids: ['toys', 'clothing', 'shoes'],
};

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    enum: ['men', 'women', 'kids'],
    required: true,
  },
  subCategory: {
    type: String,
    validate: {
      validator: function (value) {
        return subCategories[this.category]?.includes(value);
      },
      message: (props) => `${props.value} is not a valid subcategory for ${props.instance.category}`,
    },
  },
  brand: String,
  sizes: [String],
  colors: [String],
  images: [String],
  stock: {
    type: Number,
    default: 0,
  },
  
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
