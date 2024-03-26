import express from "express";
import {getRatedResList, postRateRestaurant} from "../../controllers/private/rateResController.js";
import {middleToken} from "../../config/jwt.js";

const rateResRouter = express.Router();


rateResRouter.get('/', middleToken, getRatedResList);
rateResRouter.post('/:resId', middleToken, postRateRestaurant);

export default rateResRouter;