import express from 'express';
import { authController } from './auth.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { authValidation } from './auth.validation';
import { validateUser } from '../../middleware/checkAuth';
import { UserRole } from '../user/user.interface';

const router = express.Router()

router.post('/login', validateRequest(authValidation.loginValidationSchema), authController.loginUser)
router.get('/me', validateUser(UserRole.ADMIN, UserRole.USER), authController.getMe)
router.post("/logout", authController.logout)

export const authRouter = router