import moment from "moment"
import { TraingleIcon } from "../../../../svg"
import FileImageVideo from "./FileImageVideo";
import FileOthers from "./FileOthers";
export default function FileMessage({fileMessage,message,me})
{
    const {file,type}=fileMessage;
    return(<div className={`w-full flex mt-2 space-x-3 max-w-xs ${me ? "ml-auto justify-end" : ""}`}>
    {/*Message Container */}
    
    <div className="relative">
        {
            !me && message.conversation.isGroup &&
            (<div className="absolute top-1 left-[-37px]">
                <img src={message.sender.picture} alt="" className="w-8 h-8 rounded-full"/>
            </div>)
        }
        
        <div className={`relative h-full dark:text-dark_text_1 rounded-lg
        ${me? "border-[3px] border-green_4" : "dark:bg-dark_bg_2" }
        ${me && file.public_id.split(".")[1]==="PNG" ? "bg-white" : "bg-green_3 p-1"}
        `}>
            {/* Message */}
            <p className="h-full text-sm pb-4">
            {
                type==="IMAGE" || type==="VIDEO"
                ?
                (<FileImageVideo url={file.secure_url} type={type}/>)
                :
               (<FileOthers file={file} type={type}/>)
            }

            </p>
            {/* Message date */}
            <span className="absolute right-1.5 bottom-1.5 text-xs text-dark_text_5 leading-none">{moment(message.createdAt).format("HH:mm")}</span>
            {/* Triangle */}
            {
                !me 
                ? 
                (<span>
                        <TraingleIcon className="dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5"/>
                </span>)
                : null
            }
        </div>
    </div>

</div>
)
}