const User = require('../model/userModel.js')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const bcrypt = require('bcrypt');

const sendEmail = async (email, subject, message) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    await transporter.sendMail({
        from: '"Jinni" <' + process.env.EMAIL_USER + '>',
        to: email,
        subject: subject,
        text: message
    });
};


// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Request OTP for login
exports.requestOTP = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate OTP and expiry
    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

    await user.save();

    await sendEmail(email, 'Your OTP Code', `Your OTP is ${otp}`);

    res.json({ message: 'OTP sent to your email' });
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email, otp, otpExpires: { $gt: Date.now() } });

    if (!user) return res.status(400).json({ message: 'Invalid or expired OTP' });

    // If OTP is valid, allow user to set a new password
    user.password = await bcrypt.hash(newPassword, 10); // Hash the new password
    user.otp = undefined; // Clear OTP after successful verification
    user.otpExpires = undefined; // Clear OTP expiry

    await user.save();

    res.json({ message: 'Password updated successfully. You can now log in.' });
};