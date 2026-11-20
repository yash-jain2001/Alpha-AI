import React, { useEffect } from "react";
import Navbar from "./Navbar";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { getMessages } from "../features/getMessages";
import { createConversations } from "../features/createConversations";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";
import { addConversation, setSelectedConversation } from "../redux/conversationSlice";
import { Plus, Sparkles } from "lucide-react";

const ChatArea = () => {
  const { selectedConversation } = useSelector((state) => state.conversations);
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedConversation) {
      const getMsg = async () => {
        const data = await getMessages(selectedConversation?._id);
        dispatch(setMessages(data));
      };
      getMsg();
    }
  }, [selectedConversation]);

  const handleNewChat = async () => {
    const data = await createConversations();
    if (data) {
      dispatch(addConversation(data));
      dispatch(setSelectedConversation(data));
    }
  };

  return (
    <div className="flex flex-1 h-screen overflow-hidden bg-[#0d0f14]">
      {selectedConversation ? (
        <div className="flex flex-col w-full h-full">
          <Navbar />
          <MessageList />
          <ChatInput />
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center h-full w-full px-6 text-center select-none">
          <div className="max-w-2xl flex flex-col items-center gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium tracking-wide">
              <Sparkles size={14} className="animate-pulse" />
              <span>Next-Gen Multi-Agent AI</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-indigo-500 to-violet-600 bg-clip-text text-transparent">
                Alpha AI
              </span>
            </h1>

            <p className="text-slate-400 text-base sm:text-lg max-w-lg leading-relaxed">
              {userData?.name ? `Hello, ${userData.name.split(" ")[0]}! ` : ""}
              Start a new conversation to brainstorm ideas, write and debug code, or explore insights with specialized AI agents.
            </p>

            <button
              onClick={handleNewChat}
              className="mt-2 inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 active:scale-95 transition-all duration-150 cursor-pointer border-none"
            >
              <Plus size={18} />
              <span>Start New Chat</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatArea;
