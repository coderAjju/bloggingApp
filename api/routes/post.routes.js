import express from 'express'
import {protectRoute} from '../middleware/protectRoute.js'
import {createPost} from '../controller/post.controller.js'
const router = express.Router();

router.post("/create",protectRoute ,createPost);

export default router;
