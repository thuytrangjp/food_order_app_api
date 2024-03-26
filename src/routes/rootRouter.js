import express from "express";
import authRouter from "./authRouter.js";
import userRouter from "./public/userRouter.js";
import rateResRouter from "./private/rateResRouter.js";
import restaurantRouter from "./public/restaurantRouter.js";
import meRouter from './meRouter.js';

const rootRouter = express.Router();

rootRouter.use('/auth', authRouter);

rootRouter.use('/me', meRouter);

rootRouter.use('/users', userRouter);
rootRouter.use('/restaurants', restaurantRouter);
rootRouter.use('/ratings', rateResRouter);

export default rootRouter;