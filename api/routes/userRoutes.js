import express from 'express';
const router = express.Router();
import {  resetPassword, verifyOtp, register } from '../controllers/userController.js';

router.post('/register',register );
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);

export default router;
