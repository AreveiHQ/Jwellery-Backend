const mongoose = require('mongoose');


const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: (name) => {
                const nameRegex = /^[a-zA-Z ]{2,}$/;
                return nameRegex.test(name);
            },
            message: 'Invalid name format',
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (email) => {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                return emailRegex.test(email);
            },
            message: 'Invalid email format',
        },
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});


const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;