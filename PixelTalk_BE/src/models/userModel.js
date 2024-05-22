import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema=mongoose.Schema(
    {
        name:{
            type: String,
            required:[true,"Kindly provide your name."],
        },
        email:{
            type:String,
            required:[true,"Kindly provide your email address."],
            unique:[true,"This email address is not unique.Please provide another one."],
            lowercase:true,
            validate:[validator.isEmail,"Please provide a valid email address"],
        },
        picture:{
            type:String,
            default:"https://res.cloudinary.com/dbwntzehh/image/upload/v1705816935/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752_evd1q1.avif",
        },
        status:{
            type:String,
            default:"Hey there! I am using PixelTalk!",
        },
        password:{
            type:String,
            required:[true, "Please provide your password."],
            minLength:[8,"Password should be atleast 8 characters long."],
            maxLength:[128,"Password should be less than 128 characters long."],
        },

    },
    {
        collection:"users",
        timestamps:true,
    }
);

userSchema.pre("save",async function(next){
    try {
        if(this.isNew){
            const salt=await bcrypt.genSalt(12);
            const hashedPassword=await bcrypt.hash(this.password,salt);
            this.password=hashedPassword;
        }
        next();
    } catch (error) {
        next(error)
    }
})

const UserModel=mongoose.models.UserModel || mongoose.model("UserModel",userSchema);

export default UserModel;