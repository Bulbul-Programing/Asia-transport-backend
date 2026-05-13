import express from 'express';
import { userController } from './user.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { userValidationSchema } from './user.validation';
import { validateUser } from '../../middleware/checkAuth';
import { UserRole } from './user.interface';

const router = express.Router()

router.get('/', userController.getAllUser)
router.post('/', validateRequest(userValidationSchema.createUserSchema), userController.createUser)
router.post('/createAdmin', validateUser(UserRole.ADMIN), validateRequest(userValidationSchema.createUserSchema), userController.createUser)

export const userRoute = router