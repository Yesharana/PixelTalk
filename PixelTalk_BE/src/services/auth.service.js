import createHttpError from "http-errors";
import validator from "validator";
import bcrypt from "bcrypt";
import {UserModel} from  "../models/index.js";

//env variables
const {DEFAULT_PICTURE,DEFAULT_STATUS}=process.env;

export const createUser=async(userData)=>{
    const {name,email,picture,status,password}=userData;

    //check if fields are empty 
    if(!name || !email || !password)
    {
        throw createHttpError.BadRequest("Please fill all the fields!");
    }

    //check name length
    if(!validator.isLength(name,{
        min:2,
        max:16,
    }))
    {
        throw createHttpError.BadRequest("The length of the name should be between 2 and 16!");
    }

    //check status length
    if(status && status.length > 64)
    {
        throw createHttpError.BadRequest("The status length can't be greater than 64 characters!");
    }

    //check if the email is valid
    if(!validator.isEmail(email))
    {
        throw createHttpError.BadRequest("Please enter a valid email address!");
    }

    //check if user already exists
    const checkDB=await UserModel.findOne({email});
    if(checkDB)
    {
        throw createHttpError.Conflict("Please try again with a different email address. This email is already used!");
    }

    //check password length
    if(!validator.isLength(password,{
        min:8,
        max:128
    }))
    {
        throw createHttpError.BadRequest("The length of your password should be between 8 and 128 characters!");
    }

    //hash password---> to be done in the user model


    //adding user to the database
    const user = await new UserModel({
        name,
        email,
        picture: picture || DEFAULT_PICTURE,
        status: status || DEFAULT_STATUS,
        password,
    }).save();

    return user;
};

export const signUser=async(email,password)=>{
    const user=await UserModel.findOne({email:email.toLowerCase()}).lean();

    //check if user exists 
    if(!user){
        throw createHttpError.NotFound("Invalid credentials.Please enterrrr a registered email address");
    }

    //compare passwords
    let passwordMatches= await bcrypt.compare(password,user.password);

    if(!passwordMatches) throw createHttpError.NotFound("Invalid credentials.Please enterrrrr valid password");

    return user;
};