import React from "react";
import { Navbar } from "../NavBar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "./FinalChatBoard.css";
import Main from "../Main/Main";

export const FinalChatBoard = () => {
  return (
    <div className="main-user-chat-page">
      <div className="parent-sidebar">
        <Sidebar />
      </div>
      <div className="parent-main-nav-bar">
        <div className="parent-nav-bar">
          <Navbar />
        </div>
        <div className="parent-main">
          <Main />
        </div>
      </div>
      {/* <div className="parent-nav-bar">
        <Navbar />
      </div>
      <div className="parent-main">
          <Main />
        </div> */}
      {/* <div className="parent-chat-app">
        <div className="parent-sidebar">
          <Sidebar />
        </div>
      </div> */}
    </div>
  );
};
