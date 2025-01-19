// import React, { useContext, useState } from "react";
// import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
// import { TbLayoutSidebarRightExpand } from "react-icons/tb";
// import { RiChatNewFill } from "react-icons/ri";
// import { assets } from "../../assets/assets";
// import { Context } from "../../context/context";
// import { Feature } from "../Feature/Feature";
// import "./Navbar.css";
// import { NewChat } from "../NewChat/NewChat";

// export const Navbar = () => {
//   const {userInfo, setUserInfo, showFeature, setShowFeature, extended, setExtended} = useContext(Context)

//   const handleClick = () => {
//     setShowFeature((prev) => !prev);
//   };


//   return (
//     <div className="nav-bar">
//       <div className="expand-left-bar">
//         {extended ? (
//           <div className="left-nav-bar"  onClick={() => setExtended((prev) => !prev)}>
//             <span className="expand-right-icon">
//               <TbLayoutSidebarRightExpand className="icon-expand left-expand" />
//             </span>
//             <span className="main-new-chat">
//                 <NewChat/>
//             </span>
//           </div>
//         ) : (
//           <div className="left-nav-bar" onClick={() => setExtended((prev) => !prev)}>
//             <span className="expand-left-icon" >
//               <TbLayoutSidebarLeftExpand className="icon-expand right-expand"/>
//             </span>
//             <span className="main-new-chat-shift">
//                 <NewChat/>
//             </span>
//           </div>
//         )}
//       </div>
//       <div className="company-name">
//         <h4>Nebula</h4>
//       </div>
//       <div className="user-profile-image">
//         <img
//           onClick={() => handleClick()}
//           src={userInfo.imageUrl || assets.user_icon}
//           alt="user-icon"
//         />
//         <div className="show-feature">{showFeature && <Feature />}</div>
//       </div>
//     </div>
//   );
// };




// ------------------------------------------
import React, { useContext } from "react";
import { TbLayoutSidebarLeftExpand, TbLayoutSidebarRightExpand } from "react-icons/tb";
import { Context } from "../../context/context";
import { Feature } from "../Feature/Feature";
import "./Navbar.css";
import { NewChat } from "../NewChat/NewChat";
import { assets } from "../../assets/assets";

export const Navbar = () => {
  const { userInfo, showFeature, setShowFeature, extended, setExtended, newChat } = useContext(Context);

  const handleClick = () => {
    setShowFeature((prev) => !prev);
  };

  return (
    <div className="nav-bar">
      <div className="expand-left-bar">
        {extended ? (
          <div className="left-nav-bar">
            {/* <span className="expand-right-icon" > */}
              <TbLayoutSidebarRightExpand onClick={() => setExtended((prev) => !prev)} className="icon-expand right-expand" />
            {/* </span> */}
            <span className="main-new-chat" onClick={() => newChat()}>
              <NewChat />
            </span>
          </div>
        ) : (
          <div className="left-nav-bar">
            {/* <span className="expand-left-icon" onClick={() => setExtended((prev) => !prev)}> */}
              <TbLayoutSidebarLeftExpand onClick={() => setExtended((prev) => !prev)} className="icon-expand left-expand" />
            {/* </span> */}
            <span className="main-new-chat" onClick={() => newChat()}>
              <NewChat />
            </span>
          </div>
        )}
      </div>
      <div className="company-name">
        {/* <h4>Nebula</h4> */}
        <img src={assets.icon2} alt="" />
      </div>
      <div className="user-profile-image">
        <img
          onClick={() => handleClick()}
          src={JSON.parse(localStorage.getItem("user")).imageUrl || assets.user_icon}
          alt="user-icon"
        />
        <div className="show-feature">{showFeature && <Feature />}</div>
      </div>
    </div>
  );
};
