import {MessageModel} from "../models/index.js"
import createHttpError from "http-errors";
export const createMessage=async(data)=>{
    let newMessage=await MessageModel.create(data);
    if(!newMessage){
        throw createHttpError.BadRequest("Oops...something went wrong in cm!");
    }
    return newMessage;
};

export const populateMessage=async(id)=>{
    let msg=await MessageModel.findById(id)
    .populate({
        path:"sender",
        select:"name picture",
        model:"UserModel",
    })
    .populate({
        path:"conversation",
        select:"name picture isGroup users",
        model:"ConversationModel",
        populate:{
            path:"users",
            select:"name email picture status",
            model:"UserModel",
        }
    });
    if(!msg) 
    {
        throw createHttpError.BadRequest("Oops...something went wrong in pm!");
    }
    return msg;
};

export const getConvoMessages=async(convo_id)=>{
    const messages=await MessageModel.find({conversation:convo_id})
    .populate("sender","name email picture status")        //
    .populate("conversation");
    if(!messages)
    {
        throw createHttpError.BadRequest("Oops...something went wrong!");
    }
    return messages;
};