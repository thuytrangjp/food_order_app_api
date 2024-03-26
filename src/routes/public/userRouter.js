import express from "express";
import {getUserList, getUserDetail} from "../../controllers/public/userController.js";
import {middleToken} from "../../config/jwt.js";

const userRouter = express.Router();

userRouter.get('/', middleToken, getUserList);
userRouter.get('/:userId', middleToken, getUserDetail);

export default userRouter;