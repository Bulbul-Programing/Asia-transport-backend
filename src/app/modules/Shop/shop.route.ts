import express from 'express';
import { shopController } from './shop.controller';

const router = express.Router()

router.get('/', shopController.getAllShop)

export const shopRouter = router