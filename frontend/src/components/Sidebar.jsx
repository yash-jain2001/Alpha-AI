import React from "react";
import {
  Coins,
  LogOut,
  MessageSquare,
  PanelLeft,
  PanelRight,
  PenSquare,
  Plus,
  User,
} from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../features/getConversations";
import {
  setConversations,
  addConversation,
  setSelectedConversation,
} from "../redux/conversationSlice";
import { createConversations } from "../features/createConversations";
import { logOut } from "../features/logout";
import { setUserData } from "../redux/userSlice";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [imageError, setImageError] = useState(false);

  const dispatch = useDispatch();
  const { conversations, selectedConversation } = useSelector(
    (state) => state.conversations,
  );

  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const getConv = async () => {
      const data = await getConversations();
      dispatch(setConversations(data));
    };
    getConv();
  }, [userData?._id]);

  const handleCreateConversation = async () => {
    const data = await createConversations();
    if (data) {
      dispatch(addConversation(data));
      dispatch(setSelectedConversation(data))
    }
  };

  if (!sidebarOpen) {
    return (
      <div className="hidden lg:flex flex-col items-center w-14 h-scree bg-[#0d0f14] border-r border-white/6 py-4 gap-1 shrink-0">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-slate-200 hover-bg-white/5 transition-colors duration-150 bg-transparent border-none cursor-pointer mb-8"
        >
          <PanelRight size={24} />
        </button>
        <button
          onClick={handleCreateConversation}
          className="flex items-center justify-center w-9 h-9 mb-2 rounded-xl text-slate-500 hover:text-slate-200 hover:bg-linear-to-br from-indigo-500 to-violet-700 transition-colors duration-150 bg-transparent border-none cursor-pointer"
        >
          <Plus size={30} />
        </button>
        <div className="flex-1">
          {conversations.map((conv, idx) => {
            const isActive = selectedConversation?._id == conv?._id;
            return (
              <div
                onClick={() => dispatch(setSelectedConversation(conv))}
                key={idx}
                className={`flex items-center gap-2.5 bg-indigo-500/20 hover:text-slate-100 hover:bg-indigo-500/20 cursor-pointer mb-0.5 px-1.5 py-1.5 rounded-full border transition-colors duration-150
                        ${isActive ? "text-slate-100 border-indigo-500/18" : "text-slate-500 bg-transparent border-transparent"}`}
              >
                <MessageSquare size={15} />
              </div>
            );
          })}
        </div>
        <div className="relative shrink-0">
          {userData?.avatar && !imageError ? (
            <img
              src={userData.avatar}
              alt=""
              className="w-8 h-8 rounded-[10px] object-cover border-2 border-indigo-500/25"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-9 h-9 rounded-[10px] flex items-center justify-center">
              <User size={15} className="text-slate-400" />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed lg:static inset-y-0 left-0 z-50 w-[270px] h-screen shrink-0 bg-[#0d0f14] border-r border-white/[0.06] ">
      <div className="flex flex-col h-full">
        <div
          id="header"
          className="flex items-center gap-2.5 h-15 py-4 border-b-2 px-4 border-white/6"
        >
          <div
            onClick={() => setSidebarOpen(false)}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-colors duration-150 bg-transparent border-none cursor-pointer"
          >
            <PanelLeft size={24} />
          </div>
          <span className="text-[18px] flex-1 font-semibold text-slate-100 tracking-tight">
            Alpha-AI
          </span>

          <button
            onClick={handleCreateConversation}
            className="flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-colors duration-150 bg-transparent border-none cursor-pointer"
          >
            <PenSquare size={24} />
          </button>
        </div>
        <div id="new chat" className="px-4 pt-4 pb-1">
          <button
            onClick={handleCreateConversation}
            className=" w-full flex items-center justify-center gap-2 text-sm font-medium text-white bg-linear-to-br from-indigo-500 to-violet-700 rounded-xl py-2.5 border-none cursor-pointer hover:opacity-90 transition-opacity duration-150"
          >
            <Plus size={20} /> New Chat
          </button>
        </div>

        {conversations.length == 0 ? (
          <div className="px-5 pt-4 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-400">
            No Recent Conversations
          </div>
        ) : (
          <div className="px-5 pt-4 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-400">
            Recents
          </div>
        )}

        <div
          id="conversations"
          className="flex-1 overflow-y-auto px-2.5 pb-2 [scrollbar-width:none] [&::webkit-scrollbar]:hidden"
        >
          {conversations.map((conv, idx) => {
            const isActive = selectedConversation?._id == conv?._id;
            return (
              <div
                onClick={() => dispatch(setSelectedConversation(conv))}
                key={idx}
                className={`flex items-center gap-2.5 hover:text-slate-100 hover:bg-indigo-500/10 cursor-pointer mb-0.5 px-3 py-1 rounded-[10px] border transition-colors duration-150
                        ${isActive ? "bg-indigo-500/10 text-slate-100 border-indigo-500/18" : "text-slate-500 bg-transparent border-transparent"}`}
              >
                <MessageSquare size={15} />
                <span className="text-[15px]">{conv.title || "New Chat"}</span>
              </div>
            );
          })}
        </div>

        <div id="footer" className=" border-t border-white/6">
          <div className="">
            {userData ? (
              <div className="flex items-center gap-2.5 px-3 py-3 hover:bg-white/5 transition-colors duration-150">
                <div className="relative shrink-0">
                  {userData?.avatar && !imageError ? (
                    <img
                      src={userData.avatar}
                      alt=""
                      className="w-8 h-8 rounded-[10px] object-cover border-2 border-indigo-500/25"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-[10px] flex items-center justify-center">
                      <User size={15} className="text-slate-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13.5px] font-semibold text-slate-100 truncate">
                    {userData.name || "User"}
                  </p>
                  <span className="text-[10px] font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full tracking-wide">
                    Free
                  </span>
                </div>
                <div className="flex gap-1">
                  <button className="flex items-center justify-center w-8 h-8 p-1 rounded-[7px] border-none bg-transparent text-yellow-600 cursor-pointer hover:bg-white/8 hover:text-amber-500 transition-all duration-150">
                    <Coins size={24} />
                  </button>
                  <button
                    onClick={() => {
                      logOut();
                      dispatch(setUserData(null));
                    }}
                    className="fles items-center justify-center w-8 h-8 p-1 rounded-[7px] border-none bg-transparent text-slate-600 cursor-pointer hover:bg-white/8 hover:text-red-400 transition-all duration-150"
                  >
                    <LogOut size={23} />
                  </button>
                </div>
              </div>
            ) : (
              <button>Login</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
