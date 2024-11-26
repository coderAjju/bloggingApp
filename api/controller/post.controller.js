import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const createPost = async (req,res,next)=> {
    
    if(!req.isAdmin){
        return next(errorHandler(403,"You are not allowed to create post"))
    };
    if(!req.body.title || !req.body.content){
        return next(errorHandler(400,"Please provide all required fields"))
    }
    const slug = req.body.title.trim().split(" ").join("-").toLowerCase().replace(/[^a-zA-Z0-9-]/g, "-");
    const newPost = new Post({
        ...req.body,slug,userId:req.userId
        })

    try {
        const savedPost = await newPost.save();
        return res.status(201).json({post:savedPost,message:"Post created successfully"})
    } catch (error) {
        if (error.code === 11000) {

            // Handle MongoDB duplicate key error
            return res.status(400).json({ 
              message: `title already exists. Please use a different title.`
            });
        next(error)
    }
}
}