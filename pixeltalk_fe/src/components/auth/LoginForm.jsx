import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import { signinSchema } from "../../utils/validation.js";
import AuthInput from "./AuthInput.jsx";
import { useDispatch, useSelector } from "react-redux";
import HashLoader from "react-spinners/HashLoader.js";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../features/userSlice.js";


export default function LoginForm()
{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {status,error}= useSelector((state)=>state.user);
    
    const{
        register,
        handleSubmit,
        formState:{errors},
    } = useForm({
        resolver: yupResolver(signinSchema),
    });
   //why we have spread the value?
    const onSubmit= async (values)=>{
        let res=await dispatch(loginUser({...values}));
        if(res?.payload?.user)
        {
            navigate("/");
        }   
        // if we have user then we will redirect

    };
    return (
        <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Container */}
            <div className="w-full max-w-md space-y-8 p-10  dark:text-dark_text_1 dark:bg-dark_bg_2 rounded-xl">
                {/* Heading */}
                <div className=" text-center ">
                    <h2 className="mt-6 text-3xl font-bold">We've missed you</h2>
                    <p className="mt-2 text-sm">Sign In</p>
                </div>
                {/* Form */}
                <form 
                onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
                    
                    <AuthInput
                    name="email"
                    type="text"
                    placeholder="Email Address"
                    register={register}
                    error={errors?.email?.message}
                    />
                   
                    <AuthInput
                    name="password"
                    type="password"
                    placeholder="Password"
                    register={register}
                    error={errors?.password?.message}
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
                        {status==="loading"?<HashLoader color="#fff" size={20} />:"Sign in"}
                    </button>
                    {/* Sign in link */}
                    <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
                        <span>Don't have an account?</span>
                        <a href="/register"
                        className=" hover:underline cursor-pointer transition ease-in duration-300"
                        
                        >Sign up</a>
                    </p>
                    
                </form>
            </div>
        </div>
    );
}