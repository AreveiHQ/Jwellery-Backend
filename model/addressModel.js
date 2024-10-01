const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    street: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
      },
      city: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
      },
      state: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
      },
      postalCode: {
        type: Number,
        required: true,
        match: /^[1-9][0-9]{5}$/,  
      },
      country: {
        type: String,
        required: true,
        enum: ['India'],
      },
      landmark: {
        type: String,
        minlength: 3,
        maxlength: 100,
      },
      apartmentNumber: {
        type: String,
        minlength: 1,
        maxlength: 10,
      }
});

const Address=mongoose.model("Address",addressSchema);

module.exports = Address;