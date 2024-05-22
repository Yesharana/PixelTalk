import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import { signupSchema } from "../../utils/validation.js";
import AuthInput from "./AuthInput.jsx";
import { useDispatch, useSelector } from "react-redux";
import HashLoader from "react-spinners/HashLoader.js";
import { useNavigate } from "react-router-dom";
import { registerUser,changeStatus } from "../../features/userSlice.js";
import { useState } from "react";
import Picture from "./Picture.jsx";
import axios from "axios";

const cloud_secret=process.env.REACT_APP_CLOUD_SECRET;
const cloud_name=process.env.REACT_APP_CLOUD_NAME;

export default function RegisterForm()
{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {status,error}= useSelector((state)=>state.user);
    const [picture,setPicture]=useState();
    const [readablePicture,setReadablePicture]=useState("");
    const{
        register,
        handleSubmit,
        watch,
        formState:{errors},
    } = useForm({
        resolver: yupResolver(signupSchema),
    });
    const onSubmit = async (data) => {
        
        dispatch(changeStatus("loading"));
        if(picture)
        {
            //upload to cloudinary and then register the user
            await uploadImage().then(async(response)=>{
                let res=await dispatch(registerUser({...data,picture:response.secure_url})); 
                if(res?.payload?.user)
                {
                    navigate("/");
                }     
            });

        }
        else
        {
            let res=await dispatch(registerUser({...data,picture:""}));  
            if(res?.payload?.user)
            {
                navigate("/");
            }
        }
    };
    //This is how we send files and few info in formData
    console.log("values",watch());
    console.log("errors",errors);
    const uploadImage=async()=>{
        let formData=new FormData();
        formData.append("upload_preset",cloud_secret);
        formData.append("file",picture);
        const { data } = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`,
            formData
          );
        console.log(data); //  after uploading image, we get the data 
              return data;
    }
    return (
        <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Container */}
            <div className="w-full max-w-md space-y-8 p-10  dark:text-dark_text_1 dark:bg-dark_bg_2 rounded-xl">
                {/* Heading */}
                <div className=" text-center ">
                    <h2 className="mt-6 text-3xl font-bold">Greetings</h2>
                    <p className="mt-2 text-sm">Enroll</p>
                </div>
                {/* Form */}
                <form 
                onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
                    <AuthInput
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    register={register}
                    error={errors?.name?.message}
                    />
                    <AuthInput
                    name="email"
                    type="text"
                    placeholder="Email Address"
                    register={register}
                    error={errors?.email?.message}
                    />
                    <AuthInput
                    name="status"
                    type="text"
                    placeholder="Status(Optional)"
                    register={register}
                    error={errors?.status?.message}
                    />
                    <AuthInput
                    name="password"
                    type="password"
                    placeholder="Password"
                    register={register}
                    error={errors?.password?.message}
                    />
                    {/* Picture */}
                    <Picture
                    readablePicture={readablePicture}
                    setReadablePicture={setReadablePicture}
                    setPicture={setPicture}
                    />
                    {/* Error  message*/}
                    {
                        error ? <div>
                            <p className="text-red-400">{error}</p>
                        </div> : null
                    }
                    {/* Submit button */}
                    <button 
                    className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300"
                    type="submit">
                        {status==="loading"?<HashLoader color="#fff" size={20} />:"Sign up"}
                    </button>
                    {/* Sign in link */}
                    <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
                        <span>Have an account?</span>
                        <a href="/login"
                        className=" hover:underline cursor-pointer transition ease-in duration-300"
                        >Sign in</a>
                    </p>
                    
                </form>
            </div>
        </div>
    );
}
//watch is a function that allows you to watch the values of specified input fields in the form. It enables you to track changes to specific form fields and respond to those changes accordingly.