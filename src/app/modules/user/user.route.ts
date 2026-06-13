import express from 'express';
import { userController } from './user.controller.js';
import { validateRequest } from '../../middleware/validateRequest.js';
import { userValidationSchema } from './user.validation.js';
import { validateUser } from '../../middleware/checkAuth.js';
import { UserRole } from './user.interface.js';

const router = express.Router()

router.get('/', userController.getAllUser)
router.post('/', validateRequest(userValidationSchema.createUserSchema), userController.createUser)
router.post('/createAdmin', validateUser(UserRole.ADMIN), validateRequest(userValidationSchema.createUserSchema), userController.createUser)

export const userRoute = router