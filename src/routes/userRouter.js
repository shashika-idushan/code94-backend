import { Router } from "express";
import {loginUser, registerUser } from "../controllers/userController.js";



const userRouter = Router();

userRouter.post('/', registerUser)
userRouter.post('/login', loginUser)

export {userRouter}