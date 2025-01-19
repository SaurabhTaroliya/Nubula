// import React, { useContext, useState } from "react";
// import "./Profile.css";
// import { assets } from "../../assets/assets";
// import { Context } from "../../context/context";
// // import defaultProfileImage from 'asset' // Replace with actual path to default image

// const Profile = () => {
//   const { userInfo, setUserInfo } = useContext(Context);
//   const [user, setUser] = useState({
//     image: userInfo.image,
//     firstName: userInfo.firstName,
//     lastName: userInfo.lastName,
//     email: userInfo.email,
//     phoneNumber: userInfo.phoneNumber,
//     address: userInfo.address,
//     linkedIn: userInfo.linkedIn,
//     github: userInfo.github,
//     bio: userInfo.bio,
//   });

//   const [editMode, setEditMode] = useState(false);
//   const [edited, setEdited] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     console.log(name, value);

//     setUser({ ...user, [name]: value });
//     console.log(user);

//     setEdited(true);
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     console.log({ firstName, lastName, email, password, gender });

//     const url = `${baseUrl}/User/Update/${userInfo.id}`;
//     try {
//       const response = await axios.post(url, user);
//       console.log(response);
//       console.log(response.data);

//       if (response && response.data) {
//         toast.success("Successfully update");
//         // Navigate to the main page or show the sidebar and main components
//         navigate("/ChatApp"); //We know /ChatApp is the route for Sidebar and Main components
//       } else {
//         console.log("Update Unsuccesfull: No data received");
//       }
//     } catch (error) {
//       if (error.response) {
//         toast.warn(error.response.data.message);
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         console.error("SignUp failed:", error.response.data.message);
//       } else if (error.request) {
//         toast.error(error.message);
//         // The request was made but no response was received
//         console.error("No response received:", error.request);
//       } else {
//         toast.error(error.message);
//         // Something happened in setting up the request that triggered an Error
//         console.error("Error:", error.message);
//       }
//     }
//     setEdited(false);
//   };

//   return (
//     <div className="profile-container">
//       <div className="profile-header">
//         <h2>User Profile</h2>
//       </div>
//       <div className="profile-image">
//         <img src={user.image} alt="Profile" />
//       </div>
//       <div className="profile-details">
//         <div className="profile-field">
//           <label>First Name</label>
//           <input
//             type="text"
//             name="firstName"
//             value={user.firstName}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="profile-field">
//           <label>Last Name</label>
//           <input
//             type="text"
//             name="lastName"
//             value={user.lastName}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="profile-field">
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             value={user.email}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="profile-field">
//           <label>Phone Number</label>
//           <input
//             type="tel"
//             name="phoneNumber"
//             value={user.phoneNumber}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="profile-field">
//           <label>Address</label>
//           <input
//             type="text"
//             name="address"
//             value={user.address}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="profile-field">
//           <label>LinkedIn</label>
//           <input
//             type="url"
//             name="linkedIn"
//             value={user.linkedIn}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="profile-field">
//           <label>GitHub</label>
//           <input
//             type="url"
//             name="github"
//             value={user.github}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="profile-field bio-field">
//           <label>Bio</label>
//           <textarea name="bio" value={user.bio} onChange={handleChange} />
//         </div>
//       </div>
//       {edited && (
//         <div className="profile-actions">
//           <button className="save-btn" onClick={handleSave}>
//             Save Changes
//           </button>
//         </div>
//       )}
//       <div className="profile-back">
//         <button
//           className="back-btn"
//           onClick={() => (window.location.href = "/chatApp")}
//         >
//           Back to ChatApp
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Profile;

// ---------------------------------------------------------------------------------

import React, { useContext, useState } from "react";
import "./Profile.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { IoNavigateSharp } from "react-icons/io5";


const Profile = () => {
  const { userInfo, setUserInfo, userPromptHistory } = useContext(Context);
  // const token = localStorage.getItem("token");

  const userData = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(userData);

  // const [user, setUser] = useState({
  //   'firstName': user.firstName,
  //   'lastName': user.lastName,
  //   'email': user.email,
  //   'password': user.password,
  //   'gender': user.gender,
  //   'id': user.id,
  //   'dateOfjoing': user.dateOfjoing,
  //   'userPromptHistory': Array.isArray(user.userPromptHistory) ? user.userPromptHistory : [],
  //   'imageUrl': user.imageUrl,
  //   'bio': user.bio,
  //   'linkedIn': user.linkedIn,
  //   'github': user.github,
  //   'phoneNumber': user.phoneNumber,
  //   'address': user.address
  // });

  const [editMode, setEditMode] = useState(false);
  const [edited, setEdited] = useState(false);
  const baseUrl = "https://localhost:7260/api";
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setEdited(true);
  };

  const handleImageChange = (e) => {
    console.log(user.imageUrl);

    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUser({ ...user, imageUrl: e.target.result });
        setEdited(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(user)); // Update the user info in localStorage
    console.log(user);

    const url = `${baseUrl}/User/Update/${user.id}`;


    try {
      const response = await axios.put(url, user );
      console.log(response);
      console.log(response.data);

      if (response && response.data) {
        toast.success("Successfully updated");
        navigate("/ChatApp");
      } else {
        console.log("Update Unsuccessful: No data received");
      }
    } catch (error) {
      if (error.response) {
        toast.warn(error.response.data.message);
      } else if (error.request) {
        toast.error(error.message);
      } else {
        toast.error(error.message);
      }
    }
    setEdited(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h4>User Profile</h4>
      </div>
      <div className="profile-image">
        {/* <img src={user.imageUrl} alt="Profile" /> */}
        <label htmlFor="fileInput" className="custom-file-input">
          <img src={user.imageUrl} alt="Profile" />
        </label>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <div className="profile-details">
        <div className="profile-field">
          <label>First Name</label>

          <input
            type="text"
            name="firstname"
            value={user.firstname}
            onChange={handleChange}
          />
        </div>
        <div className="profile-field">
          <label>Last Name</label>
          <input
            type="text"
            name="lastname"
            value={user.lastname}
            onChange={handleChange}
          />
        </div>
        <div className="profile-field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className="profile-field">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="profile-field">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleChange}
          />
        </div>
        <div className="profile-field">
          <label>LinkedIn</label>
          <div className="fieldPlusIcon">
            <input
              type="url"
              name="linkedIn"
              value={user.linkedIn}
              onChange={handleChange}
            />
              {user.linkedIn && (
                <a href={user.linkedIn} target="_blank">
                  <IoNavigateSharp />
                </a>
            )}
          </div>
        </div>
        <div className="profile-field">
          <label>GitHub</label>
          <div className="fieldPlusIcon">
            <input
              type="url"
              name="github"
              value={user.github}
              onChange={handleChange}
            />
              {user.github && (
                <a href={user.github} target="_blank" rel="noopener noreferrer">
                  <IoNavigateSharp />
                </a>
            )}
          </div>
          
          
        </div>
        <div className="profile-field bio-field">
          <label>Bio</label>
          <textarea name="bio" value={user.bio} onChange={handleChange} />
        </div>
      </div>
      {edited && (
        <div className="profile-actions">
          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      )}
      <div className="profile-back">
        <button
          className="back-btn"
          onClick={() => (window.location.href = "/chatApp")}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Profile;
