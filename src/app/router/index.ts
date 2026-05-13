import express from 'express';
import { userRoute } from '../modules/user/user.route';
import { TRRouter } from '../modules/TR/TR.route';

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
        path: '/tr',
        route: TRRouter
    },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router