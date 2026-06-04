import express from 'express';
import { arrayOfObjectValidateRequest, validateRequest } from '../../middleware/validateRequest';
import { TRValidationSchema } from './TR.Validation';
import { TRController } from './TR.controller';

const router = express.Router()

router.get('/', TRController.getTRsByBookingDate)
router.get('/:trid', TRController.getTR)
router.patch('/updatePaymentStatus', TRController.updateTRPaymentStatus)
router.patch('/:trid', validateRequest(TRValidationSchema.updateTRValidationSchema), TRController.updateTR)
router.post('/', validateRequest(TRValidationSchema.createTRValidationSchema), TRController.createTR)
router.post('/multiple', arrayOfObjectValidateRequest(TRValidationSchema.createMultipleTRValidationSchema), TRController.createMultipleTR)

export const TRRouter = router