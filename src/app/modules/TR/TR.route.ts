import express from 'express';
import { arrayOfObjectValidateRequest, validateRequest } from '../../middleware/validateRequest.js';
import { TRValidationSchema } from './TR.Validation.js';
import { TRController } from './TR.controller.js';

const router = express.Router()

router.get('/', TRController.getTRsByBookingDate)
router.get('/:trid', TRController.getTR)
router.patch('/updatePaymentStatus', TRController.updateTRPaymentStatus)
router.patch('/:trid', validateRequest(TRValidationSchema.updateTRValidationSchema), TRController.updateTR)
router.post('/', validateRequest(TRValidationSchema.createTRValidationSchema), TRController.createTR)
router.post('/multiple', arrayOfObjectValidateRequest(TRValidationSchema.createMultipleTRValidationSchema), TRController.createMultipleTR)
router.delete('/:trid', TRController.deleteTR)

export const TRRouter = router