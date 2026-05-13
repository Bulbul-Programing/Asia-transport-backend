import express from 'express';  
import { validateRequest } from '../../middleware/validateRequest';
import { TRValidationSchema } from './TR.Validation';
import { TRController } from './TR.controller';

const router = express.Router()

router.post('/', validateRequest(TRValidationSchema.createTRValidationSchema), TRController.createTR)


export const TRRouter = router