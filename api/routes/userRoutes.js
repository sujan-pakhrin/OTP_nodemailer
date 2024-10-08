import express from 'express';
const router = express.Router();
import {   verifyOtp, register, forgetPassword, verifyForgetOtp, changeNewPassword } from '../controllers/userController.js';

router.post('/register',register );
router.post('/verify-otp', verifyOtp);
router.post('/forget-password', forgetPassword);
router.post('/verify-forget-otp', verifyForgetOtp);
router.post('/forget-password-change', changeNewPassword);

export default router;
