import express from 'express';
import { userRoute } from '../modules/user/user.route';
import { TRRouter } from '../modules/TR/TR.route';
import { authRouter } from '../modules/Auth/auth.routes';

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
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router