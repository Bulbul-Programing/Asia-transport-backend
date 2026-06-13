import express from 'express';
import { userRoute } from '../modules/user/user.route.js';
import { TRRouter } from '../modules/TR/TR.route.js';
import { authRouter } from '../modules/Auth/auth.routes.js';
import { shopRouter } from '../modules/Shop/shop.route.js';
import { DailyExpenseRoutes } from '../modules/DailyExpense/DailyExpense.route.js';

type TModuleRoute = {
    path: string,
    route: express.Router
}

const router = express.Router()

const moduleRoutes: TModuleRoute[] = [
    {
        path: '/user',
        route: userRoute
    },
    {
        path: '/auth',
        route: authRouter
    },
    {
        path: '/tr',
        route: TRRouter
    },
    {
        path: '/shop',
        route: shopRouter
    },
    {
        path: '/dailyExpense',
        route: DailyExpenseRoutes
    },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router