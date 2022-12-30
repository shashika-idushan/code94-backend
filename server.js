import express from "express";
import cors from "cors";
import logger from "./src/utils/logger.js";
import 'dotenv/config';
import { dbConfig } from "./src/configs/dbConfig.js";
import {productRouter} from "./src/routes/productRouter.js";
import bodyParser from "body-parser";
import { userRouter } from "./src/routes/userRouter.js";

const app = express();
const PORT = process.env.PORT || 8085;


//enable cors
// app.use(cors({origin:'http://localhost:3000'}))
app.use(cors())
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'));

// routes
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);

//Start the server
app.listen(PORT, ()=>{
    logger.info('Server is up and running on port ' + PORT);

    //Connect DB 
    dbConfig();   
}); 