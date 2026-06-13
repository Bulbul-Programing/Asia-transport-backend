import express from 'express';
import { userRoute } from '../modules/user/user.route.js';
import { TRRouter } from '../modules/TR/TR.route.js';
import { authRouter } from '../modules/Auth/auth.routes.js';
import { shopRouter } from '../modules/Shop/shop.route.js';

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
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router