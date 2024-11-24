import express from 'express'
import { test } from '../controller/auth.controller.js';

const router = express();

router.get('/', test)


export default router;
