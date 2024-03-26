import express from "express";
import {middleToken} from "../../config/jwt.js";
import {
    getRestaurantDetail,
    getRestaurantList
} from "../../controllers/public/restaurantController.js";

const restaurantRouter = express.Router();

restaurantRouter.get('/', middleToken, getRestaurantList);
restaurantRouter.get('/:resId', middleToken, getRestaurantDetail);

export default restaurantRouter;