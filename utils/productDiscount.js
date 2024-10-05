function applyDiscount(sellingPrice, discount) {
    if (discount && discount > 0) {
      return sellingPrice - (sellingPrice * discount / 100);
    }
    return sellingPrice;
}

module.exports={applyDiscount};