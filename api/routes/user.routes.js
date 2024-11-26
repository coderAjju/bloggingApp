import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js'
import { updateUserInfo ,deleteUser,signOut} from '../controller/user.controller.js';

const router = express.Router()

router.post("/update/:userId",protectRoute,updateUserInfo)
router.delete("/delete/:userId" ,protectRoute,deleteUser)
router.get("/signout",protectRoute,signOut);
export default router;