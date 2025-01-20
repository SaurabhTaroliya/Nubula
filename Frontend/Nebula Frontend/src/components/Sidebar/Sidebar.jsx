// import React, { useContext, useState } from 'react'
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";
import { useContext, useEffect, useState } from "react";
import Main from "../Main/Main";
import { Navbar } from "../NavBar/Navbar.jsx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const Sidebar = () => {
  // const [extended, setExtended] = useState(false);
  const {
    onSent,
    prevPrompts,
    setPrevPrompts,
    setRecentPrompt,
    newChat,
    extended,
    setExtended,
    userInfo,
    setUserInfo,
  } = useContext(Context);

  // const loadPrompt = async (prompt) => {
  //   setRecentPrompt(prompt);
  //   await onSent(prompt);
  // };
  const baseUrl = "https://localhost:7260/api";

  const loadPrompt = async (prompt) => {
    try {
      setRecentPrompt(prompt);
      await onSent(prompt);
    } catch (error) {
      console.error("Error in loadPrompt:", error);
    }
  };

  // const userData = JSON.parse(localStorage.getItem("user"));
  const userData = JSON.parse(localStorage.getItem("user")) || {};

  const deletePrompt = async (index, item) => {
    // API Call to update User Prompt History
    const id = userInfo.id;
    const url = `${baseUrl}/User/Update/${id}`;
    // console.log("prompt deleted");

    // const data = userData || userInfo;
    try {
      const updatedUserInfo = {
        ...userInfo,
        userPromptHistory: userInfo.userPromptHistory.filter(
          (val, ind) => val !== item
        ),
      };
      const res = await axios.put(url, updatedUserInfo);
      if (res) {
        toast.success("Prompt deleted successfully");
        console.log(res);
        setPrevPrompts(updatedUserInfo.userPromptHistory);
        setUserInfo(updatedUserInfo);
        console.log(userInfo);
        localStorage.removeItem("user"); // Clear localStorage with particular Key
        // localStorage.setItem("user",JSON.stringify(userInfo)); // Update the loacalStorage of Key - "user"
        localStorage.setItem("user", JSON.stringify(updatedUserInfo));
      } else {
        toast.error("Prompt deletion failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (prevPrompts.length === 0) {
      setPrevPrompts(userData.userPromptHistory);
    }
  }, []); // Run only once on mount

  return (
    <div className="sidebar">
      <div className="top">
        {/* <img
            onClick={() => setExtended((prev) => !prev)}
            className="menu"
            src={assets.menu_icon}
            alt="image"
          />
          <div onClick={() => newChat()} className="new-chat">
            <img src={assets.plus_icon} alt="plus-icon" />
            {extended ? <p>New chat</p> : null}
          </div> */}
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent Chat</p>
            <div className="recent-entries-list">
              {/* {prevPrompts.reverse().map((item, index) => {
                  // reverse() is used to reverse the prevPrompts array
                  return (
                    <div className="recent-entry" key={index}>
                      <img src={assets.message_icon} alt="message_icon" />
                      <p onClick={() => loadPrompt(item)}>
                        {item.slice(0, 18)}...
                      </p>
                    </div>
                  );
                })} */}

              {prevPrompts && prevPrompts.length > 0 ? (
                prevPrompts
                  .slice()
                  .reverse()
                  .map((item, index) => {
                    // Ensure item is valid
                    if (item) {
                      return (
                        // <div
                        // // className="recent-entry"
                        // // key={index}
                        // // onClick={() => loadPrompt(item)}
                        // >
                        //   {/* <img src={assets.message_icon} alt="message_icon" /> */}
                        //   {/* <div className="edit-icon">
                        //       <FaRegEdit/>
                        //     </div> */}
                        //   <div className="parent-recent-entry" key={index}>
                        //     <p
                        //       className="recent-entry"
                        //       onClick={() => loadPrompt(item)}
                        //     >
                        //       {item.slice(0, 18)}...
                        //     </p>
                        //     {/* {item.slice(0, 18)}... */}
                        //     <div className="del-icon">
                        //       <RiDeleteBin6Line />
                        //     </div>
                        //   </div>
                        // </div>
                        <div className="parent-recent-entry" key={index}>
                          <p
                            className="recent-entry"
                            onClick={() => loadPrompt(item)}
                          >
                            {item.slice(0, 18)}...
                          </p>
                          {/* {item.slice(0, 18)}... */}
                          <div
                            className="del-icon"
                            onClick={() => deletePrompt(index, item)}
                          >
                            <RiDeleteBin6Line />
                          </div>
                        </div>
                      );
                    }
                    return null; // Return null if item is invalid
                  })
              ) : (
                <div>No prompts available</div> // Display a message if prevPrompts is empty
              )}
            </div>
          </div>
        ) : null}
      </div>
      {/* <div className="bottom">
          <div className="bottom-item ">
            <img src={assets.question_icon} alt="question_icon" />
            {extended ? <p>Help</p> : null}
          </div>

          <div className="bottom-item ">
            <img src={assets.history_icon} alt="history_icon" />
            {extended ? <p>Activity</p> : null}
          </div>

          <div className="bottom-item ">
            <img src={assets.setting_icon} alt="setting_icon" />
            {extended ? <p>Setting</p> : null}
          </div>
        </div> */}
    </div>
    // <Main />
  );
};

export default Sidebar;
