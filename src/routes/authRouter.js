import express from "express";
import {
    signup,
    login
} from "../controllers/public/userController.js";

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);

export default authRouter;