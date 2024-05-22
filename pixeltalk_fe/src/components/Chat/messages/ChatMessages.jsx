import { useSelector } from "react-redux";
import Message from "./Message";
import { useEffect, useRef } from "react";
import FileMessage from "./files/FileMessage";

export default function ChatMessages({typing}) {
  const { messages } = useSelector((state) => state.chat); // We have messages in the store
  const { user } = useSelector((state) => state.user);
  const endRef = useRef();
// Creating a reference for scrolling to the bottom of the chat window
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="mb-[60px] bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.png')] bg-cover bg-no-repeat">
      {/* Container */}
      <div className="scrollbar overflow_scrollbar overflow-auto py-2 px-[5%]">
        {/* Messages */}
        {messages &&
          messages.map((message) => (
            <>
            {/* Message files */}
            {
              message.files.length>0 ? 
              message.files.map((file)=>
              (<FileMessage
              fileMessage={file}
              message={message}
              key={message._id}
              me={user && user._id === message.sender?._id} // if it matches the msg is sent by me then show it on right
              />
              ))
              : null
            }
            {/* Message text */}
            {message.message.length>0 ?
              (
                <Message
              message={message}
              key={message._id}
              me={user && user._id === message.sender?._id}
              />
              ):null}
            </>
          ))}
          
        <div className="mt-10" ref={endRef}></div>
      </div>
    </div>
  );
}
