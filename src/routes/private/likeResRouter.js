import express from "express";
import {
    getLikedResList,
    postLikeRestaurant,
    postUnlikeRestaurant
} from "../../controllers/private/likeResControllers.js";
import {middleToken} from "../../config/jwt.js";

const likeResRouter = express.Router();
const unlikeResRouter = express.Router();

likeResRouter.post("/:resId", middleToken, postLikeRestaurant);
likeResRouter.get("/", middleToken, getLikedResList);

unlikeResRouter.post("/:resId", middleToken, postUnlikeRestaurant);

export {
    likeResRouter,
    unlikeResRouter
}