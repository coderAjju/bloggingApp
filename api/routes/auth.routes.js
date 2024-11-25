import express from 'express'
import { signup ,signin,dataComingFromGoogle} from '../controller/auth.controller.js';

const router = express();

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/google', dataComingFromGoogle)


export default router;
