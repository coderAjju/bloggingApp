import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { errorHandler } from "../utils/error.js";
import { generateTokenAndSetCookie } from "../helper/generateToken.js";
export const signup = async (req,res,next) => {
    try {
        const {username,email,password} = req.body;

        if(!username || !email || !password){
            next(errorHandler(400,"All fields are required"));
        }
        
        let existingEmail = await User.findOne({email});
        if(existingEmail){
            next(errorHandler(400,"Email already exists"));
           }
        let existingUsername = await User.findOne({username});
        if(existingUsername){
            next(errorHandler(400,"Username already exists"));
        }

        let hashedPassword = await bcrypt.hash(password,10);

        let newUser = await User({
            username,
            email,
            password:hashedPassword
        })

        if(newUser){
            await newUser.save();
        }

        return res.status(201).json({message:"User created successfully"})
    } catch (error) {
        next(error);    
    }
}

export const signin = async (req,res,next) => {
    try {
        const {username,password} = req.body;
        if(!username || !password){
            next(errorHandler(400,"All fields are required"));
        }
        const user = await User.findOne({username});
        if(!user){
            next(errorHandler(400,"User not found"));
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            next(errorHandler(400,"Invalid credentials"));
        }

        await generateTokenAndSetCookie(user._id,res);

        return res.status(200).json({message:"User logged in successfully",user})
    } catch (error) {
        console.log("error occured in login controller ",error.message);
        next(error);
    }
}

export const dataComingFromGoogle = async (req,res,next) => {
    try {
        const {name, email, profilePic} = req.body;
        const user = await User.findOne({email});
        if(user){
            await generateTokenAndSetCookie(user._id,res,"access_token");
            let {password ,...rest} = user._doc;
            return res.status(200).json({user:rest});
        }else{
            let generatePassword = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);

            let hashedPassword = await bcrypt.hash(generatePassword,10);

            const newUser = await User.create({
                username:name.toLowerCase().split(' ').join("")+Math.random().toString(9).slice(-4),
                email,
                password:hashedPassword,
                profilePicture:profilePic
            });
            await newUser.save();
            await generateTokenAndSetCookie(newUser._id,res,"access_token");
            let {password ,...rest} = newUser._doc;
            return res.status(200).json({user:rest});
        }
    } catch (error) {
        next(error);
    }
}