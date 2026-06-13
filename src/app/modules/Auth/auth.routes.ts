import express from 'express';
import { authController } from './auth.controller.js';
import { validateRequest } from '../../middleware/validateRequest.js';
import { authValidation } from './auth.validation.js';
import { validateUser } from '../../middleware/checkAuth.js';
import { UserRole } from '../user/user.interface.js';

const router = express.Router()

router.post('/login', validateRequest(authValidation.loginValidationSchema), authController.loginUser)
router.get('/me', validateUser(UserRole.ADMIN, UserRole.USER), authController.getMe)
router.post("/logout", authController.logout)

export const authRouter = router