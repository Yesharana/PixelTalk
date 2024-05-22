import EmojiPickerApp from "./EmojiPicker";
import {Attachments} from "./attachments";
import Input from "./Input";
import { SendIcon } from "../../../svg";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../../features/chatSlice";
import { ClipLoader } from "react-spinners";
import socketContext from "../../../context/SocketContext"; 
function ChatActions({socket})
{
    const dispatch=useDispatch();
    const [showPicker,setShowPicker]=useState(false);
    const [showAttachments,setShowAttachments]=useState(false);
    const [loading,setLoading]=useState(false);
    const {activeConversation,status}=useSelector((state)=>state.chat)
    const {user}=useSelector((state)=>state.user);
    const {token} =user;
    const [message,setMessage]=useState("");
    const textRef=useRef();
    const values={
        message,
        convo_id:activeConversation._id,
        files:[],
        token,
    };
    // msg is updated
    const SendMessageHandler=async(e)=>{           
        e.preventDefault();
        setLoading(true);
        let newMsg= await dispatch(sendMessage(values));
        socket.emit("send message",newMsg.payload);
        setMessage("");  // it will empty the msg
        setLoading(false);
    };
    return ( <form 
    onSubmit={(e)=>SendMessageHandler(e)}
    className="dark:bg-dark_bg_2 h-[95px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none">
        {/* Container */}
        <div className="w-full flex items-center gap-x-2">
            {/* Emojis and attachments */}
            <ul className="flex gap-x-2">
                <EmojiPickerApp 
                textRef={textRef}
                message={message}
                setMessage={setMessage}
                showPicker={showPicker}
                setShowPicker={setShowPicker}
                setShowAttachments={setShowAttachments}
                />
                <Attachments
                showAttachments={showAttachments}
                setShowAttachments={setShowAttachments}
                setShowPicker={setShowPicker}
                />
            </ul>
            {/*  msg is sent hereInput */}
            <Input 
            message={message}
            setMessage={setMessage}
            textRef={textRef}
            />
            {/* Sendbutton */}
            <button type="submit" className="btn" onClick={()=>{setShowPicker(false)}}>
                {
                    (status==="loading" && loading) ? <ClipLoader color="#E9EDEF" size={25}/>
                    :
                <SendIcon className="dark:fill-dark_svg_1"/>
                }
            </button>
        </div>
    </form> );
}

const ChatActionsWithSocket=(props)=>(
    <socketContext.Consumer>
        {(socket)=><ChatActions {...props} socket={socket}/>}
    </socketContext.Consumer>
)

export default ChatActionsWithSocket;
//This component, ChatActions, represents the chat input and actions area where users can type messages, send emojis, attachments, and initiate sending messages.   