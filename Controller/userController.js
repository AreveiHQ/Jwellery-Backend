const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../config");
const User = require('../model/userModel');
const Address = require('../model/addressModel');

const createUser = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            return res.status(400).json({
                message: "User already exists with the same Email-ID"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword
        });

        if (!user) {
            return res.status(500).json({
                message: "Error while creating a user"
            });
        }

        const userId = user._id;
        const token = jwt.sign({ userId }, JWT_SECRET);

        res.status(201).json({
            message: "User created successfully",
            token: token
        });
    } catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const userId = user._id;
        const token = jwt.sign({ userId }, JWT_SECRET);

        res.status(200).json({
            message: "Sign-in successful",
            token: token
        });
    } catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
};

const userProfile = async (req,res)=>{
    try{
        const userId=req.userId;
        const user = await User.findOne({_id:userId});
        if(!user){
            return res.json({
                message:"Somewent Gone Wrong...! User not Found"
            })
        }

        res.json({
            name:user.name,
            phone:user.phone,
            email:user.email,
            createAt:user.createdAt,
            updateAt:user.updatedAt
        })
    }
    catch(err){
         res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
}

const addAddress= async (req,res)=>{
    try{

        const {street,city,state,postalCode,country,landmark,apartmentNumber}=req.body;
        const address = await Address.create({
            userId:req.userId,
            street,
            city,
            state,
            postalCode,
            country,
            landmark,
            apartmentNumber
        })

        if(!address){
            return res.json({
                message:"Error while adding address"
            })
        }

        res.json({
            message:"User Address added successfully",
            address:address
        })
    }
    catch(err){
        res.status(500).json({
           message: "Server error",
           error: err.message
       });
   }

}

const getAddress = async (req,res)=>{
    try{
        const address = await Address.find({userId:req.userId});
        if(!address){
            return res.json({
                message:"Address Not Found"
            })
        }

        return res.json({
            address:address
        })
    }
    catch(err){
        res.status(500).json({
           message: "Server error",
           error: err.message
       });
   }
}

module.exports = { createUser, loginUser, userProfile, addAddress, getAddress };
