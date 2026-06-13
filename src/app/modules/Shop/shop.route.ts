import express from 'express';
import { shopController } from './shop.controller.js';

const router = express.Router()

router.get('/', shopController.getAllShop)

export const shopRouter = router