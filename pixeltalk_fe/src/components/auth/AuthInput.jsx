export default function AuthInput({name,type,placeholder,register,error})
{
    return <div className="mt-8 content-center text-dark_text_1 space-y-1">
        <label htmlFor={name} className="text-sm font-bold tracking-wide">
            {placeholder}
        </label>
        <input 
        className="w-full dark:bg-dark_bg_3 text-base py-2 px-4 rounded-lg outline-none"
        type={type} placeholder={placeholder} {...register(name)} 
        />
        {error && <p className="text-red-400">{error}</p>}
    </div>
}
//the register function is likely from a form library such as React Hook Form or Formik, used to bind the input value to the form state.
//React form hook will handle validation- yup