import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";
import logger from "./configs/logger.config.js";
import { Server } from "socket.io";
import SocketServer from "./utils/SocketServer.js";
dotenv.config();
//env variables
const { DATABASE_URL }=process.env; 
// console.log(DATABASE_URL);
const PORT = process.env.PORT;  

//exit on mongodb error
mongoose.connection.on('error',(err)=>{
    logger.error(`MongoDb connection error : ${err}`)
    process.exit(1);
});

//mongodb debug mode
if(process.env.NODE_ENV!=="production")
{
    mongoose.set("debug",true);
}

// mongodb connection
mongoose.connect(DATABASE_URL).then(()=>{
    logger.info("Connected to mongodb");
}).catch(err => console.log("Error: ",err));

let server = app.listen(PORT,()=>{
    logger.info(`Server is listening at ${PORT}..`);
    
});

//socket io
const io=new Server(server,{
    pingTimeout:60000,
    cors: {
        origin: process.env.CLIENT_ENDPOINT,
    },
});

io.on("connection",(socket)=>{
    logger.info("Socket io connected successfully.")
    SocketServer(socket,io);
});

//handle server errors

const exitHandler = () =>{
    if(server) {
        logger.info("Server closed");
        process.exit(1);
    }
    else{
        process.exit(1);
    }
};

const unexpectedErrorHandler=(error)=>{
    logger.error(error);
    exitHandler();
};

process.on("uncaughtException",unexpectedErrorHandler);
process.on("unhandledRejection",unexpectedErrorHandler);

//sigterm 
process.on("SIGTERM",()=>{
    if(server) {
        logger.info("Server closed");
        process.exit(1);
    }
});
