import express from "express";
import {middleToken} from "../../config/jwt.js";
import {getOrderDetail, getOrderList, postOrder} from "../../controllers/private/orderControllers.js";

const rateResRouter = express.Router();


rateResRouter.post('/', middleToken, postOrder);
rateResRouter.get('/', middleToken, getOrderList);
rateResRouter.get('/:orderId', middleToken, getOrderDetail);

export default rateResRouter;