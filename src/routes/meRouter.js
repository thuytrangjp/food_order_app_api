import express from "express";
import {middleToken} from "../config/jwt.js";
import {likeResRouter, unlikeResRouter} from "./private/likeResRouter.js";
import rateResRouter from "./private/rateResRouter.js";
import orderRouter from "./private/orderRouter.js";

const meRouter = express.Router();

meRouter.use("/like", middleToken, likeResRouter);
meRouter.use("/unlike", middleToken, unlikeResRouter);
meRouter.use("/rate", middleToken, rateResRouter);
meRouter.use("/orders", middleToken, orderRouter);



export default meRouter;