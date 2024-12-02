import React from "react";
import { RiChatNewFill } from "react-icons/ri";
import "./NewChat.css";

export const NewChat = () => {
    return (
        <div className="new-chat">
            <RiChatNewFill className="new-icon" />
            <span>New Chat</span>
        </div>
    );
};

