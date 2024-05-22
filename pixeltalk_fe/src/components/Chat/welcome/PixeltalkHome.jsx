import { Logo } from "../../../svg";

export default function PixeltalkHome()
{
    return (<div className="h-full w-full dark:bg-dark_bg_4 select-none border-l dark:border-l-dark_border_2 border-b-[6px] border-b-green_2">
        {/* Container */}
    <div className="-mt-1.5 w-full h-full flex flex-col gap-y-8 items-center justify-center">
        <span>
            <Logo/>
        </span>
        {/* Infos */}
        <div className="mt-1 text-center space-y-[12px] ">
            <h1 className="text-[32px] dark:text-dark_text_4 font-extralight">Pixeltalk</h1>
            <p className="text-sm dark:text-dark_text_3">
                Why use phone when you can chat on your pc!!<br/>
                Use Pixeltalk on up to 4 linked devices and 1 phone at the same time.
            </p>
        </div>

    </div>
    </div>);
}