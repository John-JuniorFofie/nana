import express from "express";
import authRouter from "./auth.route";



const rootRouter = express.Router();


//auth routes
rootRouter.use('/auth',authRouter);



export default rootRouter; 