// For Authentication logic for login and sign up

import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

// login user
const loginUser = async (req, res) => {
    const {email,password} = req.body;

    try {
        const user = await userModel.findOne({email})
        if (!user) {
            return res.json({success:false, message:"User doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return res.json({success:false, message:"Invalid credentials"})
        }

        const token = createToken(user._id);
        res.json({success:true, token})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
        
    }
}


//creating token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

//register user
const registerUser = async (req, res)=> {
    const {name,password,email} = req.body;
    try {
        const exists = await userModel.findOne({email});
        //checking if user already exists
        if(exists) {
            return res.json({success:false, message:'User already exists'})
        }

        //validating email format & strong password
        if(!validator.isEmail(email)) {
            return res.json({success:false, message:'Please enter valid email'})
        }

        if (password.length < 8) {
            return res.json({success:false, message:"Please enter a strong password"})
        }

        // hashing user password (encrypting)
        const salt = await bcrypt.genSalt(10)  //it will create stront password of len 10 
        const hashedpass = await bcrypt.hash(password, salt)

        //creating new user
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedpass
        })

        const user = await newUser.save()   //saving new user
        const token = createToken(user._id)
        res.json({success:true, token})


    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
        
    }

}

export {loginUser, registerUser}