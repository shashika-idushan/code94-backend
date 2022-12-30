import mongoose from "mongoose";
import logger from "../utils/logger.js";


let database;

const dbConfig = async () => {
    const URL = process.env.MONGODB_URL;

    if(database) return;

    //Connect DB
    mongoose.connect(URL).then((connection)=>{
        database = connection;
        logger.info("Database Synced")
    }).catch((err)=>{
        logger.error(err.message)
    });
       
    // const connection = mongoose.connection;
    // connection.once("open", ()=>{
    //     console.log("Mongodb Connection Success!");
    // });
    
};

export {dbConfig}