import * as Yup from "yup";


export const signupSchema=Yup.object({
    name:Yup.string()
    .required("Name is required.")
    .matches(/^[a-zA-Z_ ]*$/,"No special characters allowed.")
    .min(2,"Name must be between 2 and 16 characters.")
    .max(16,"Name must be between 2 and 16 characters."),
    email:Yup.string()
    .required("Email is required")
    .email("Email address not valid."),
    staus:Yup.string()
    .max(64,"Status can't be more than 64 characters"),
    password:Yup.string()
    .required("Password is required.")
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain atleast 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character."
      ),
    
});

export const signinSchema=Yup.object({

  email:Yup.string()
  .required("Email is required")
  .email("Email address not valid."),

  password:Yup.string()
  .required("Password is required."),
 
});