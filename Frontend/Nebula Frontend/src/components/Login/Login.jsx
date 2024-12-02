import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Main from "../Main/Main";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import { Context } from "../../context/context";

const Login = () => {
  const { userInfo, setUserInfo, prevPrompts, setPrevPrompts, login } =
    useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const baseUrl = "https://localhost:7260/api";

  useEffect(() => {
    console.log("Updated userInfo:", userInfo);
  }, [userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ email, password });
    const url = `${baseUrl}/User/Login`;
    try {
      const response = await axios.post(url, {
        email,
        password,
      });
      console.log(response);

      // toast.success("Login Successful!", {
      //   position: toast.POSITION.TOP_RIGHT
      // });

      if (response.data.token) {
        let getByIdResponse;
        toast.success("Login Succesful!");
        const token = response.data.token;
        localStorage.setItem("token", token);
        const decodedToken = jwtDecode(token);
        // ---------------------------------------------------------NewChanges------------------------
        const url2 = `${baseUrl}/User/GetBy/${decodedToken.id}`;
        getByIdResponse = await axios.get(url2)

        console.log(getByIdResponse);
        const userData = getByIdResponse.data;


        // const updatedUserInfo = {
        //   firstName: userData.firstname,
        //   lastName: userData.lastname,
        //   email: userData.email,
        //   password: userData.password,
        //   gender: userData.gender,
        //   id: userData.id,
        //   dateOfJoining: userData.dateOfJoining,
        //   userPromptHistory: userData.userPromptHistory || [],
        //   imageUrl: userData.imageUrl,
        //   bio: userData.bio,
        //   linkedIn: userData.linkedIn,
        //   github: userData.github,
        //   phoneNumber: userData.phoneNumber,
        //   address: userData.address,
        // };

        const updatedUserInfo = { 
          id: userData.id, // Matches "Id" in the backend
          firstname: userData.firstname, // Matches "firstname"
          lastname: userData.lastname,   // Matches "lastname"
          email: userData.email,         // Matches "email"
          password: userData.password,   // Matches "password"
          gender: userData.gender,       // Matches "gender"
          dateOfJoining: new Date(userData.dateOfJoining || Date.now()).toISOString(), // Matches "dateOfJoining"
          userPromptHistory: Array.isArray(userData.userPromptHistory)
            ? userData.userPromptHistory
            : [], // Matches "userPromptHistory"
          github: userData.github || "",       // Matches "github"
          address: userData.address || "",     // Matches "address"
          linkedIn: userData.linkedIn || "",   // Matches "linkedIn"
          bio: userData.bio || "",             // Matches "bio"
          phoneNumber: userData.phoneNumber || "", // Matches "phoneNumber"
          imageUrl: userData.imageUrl || "",       // Matches "imageUrl"
        };

        console.log(updatedUserInfo);
        
        

        // --------------------------------------------------------------
        


        console.log(decodedToken);
        // const userPromptHistory = JSON.parse(
        //   decodedToken.userPromptHistory || "[]"
        // );
        // console.log(userPromptHistory);

        // Create the updated userInfo object
        // const updatedUserInfo = {
        //   firstName: decodedToken.firstName,
        //   lastName: decodedToken.lastName,
        //   email: decodedToken.email,
        //   password: decodedToken.password,
        //   gender: decodedToken.gender,
        //   id: decodedToken.id,
        //   dateOfJoing: decodedToken.dateOfJoing,
        //   userPromptHistory: userPromptHistory,
        //   imageUrl: decodedToken.imageUrl,
        //   bio: decodedToken.bio,
        //   linkedIn: decodedToken.linkedIn,
        //   github: decodedToken.github,
        //   phoneNumber: decodedToken.phoneNumber,
        //   address: decodedToken.address,
        // };

        // Update the state
        setUserInfo(updatedUserInfo);

        // Store the updated userInfo in localStorage
        localStorage.setItem("user", JSON.stringify(updatedUserInfo));
        localStorage.setItem('dateOfJoing',decodedToken.dateOfJoing)
        // console.log(localStorage.getItem('user')); // Should print a JSON string


        // localStorage.setItem("user", JSON.stringify(userInfo)); // Need to convert into string, ot store data into localStorage, directly can't store object

        // localStorage.setItem("userInfo", userInfo);
        setPrevPrompts(userData.userPromptHistory);
        console.log(userInfo.userPromptHistory);

        // console.log(userInfo.userPromptHistory);

        // console.log(typeof userInfo.userPromptHistory);

        console.log("Login successful:", response.data.token);
        // Navigate to the main page or show the sidebar and main components
        navigate("/ChatApp"); //We know /ChatApp is the route for Sidebar and Main components
      } else {
        toast.warn("Unsuccessfull Login : Wrong Creadentials");
        console.log("Login Unsuccessful: Wrong Credentials");
      }
    } catch (error) {
      if (error.response && error.response.data.title) {
        toast.warn(`${error.response.data.title} : Wrong Credentials`);
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Login failed:", error.response.data);
      } else if (error.request) {
        toast.warn(error.message);
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        toast.warn(error.message);
        // Something happened in setting up the request that triggered an Error
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left side: Image */}
        <div className="login-image">
          <img
            src={assets.nebula} // Replace with actual image URL
            alt="Login visual"
          />
        </div>

        {/* Right side: Form */}
        <div className="login-form-container">
          <div className="login-content">
            <i className="fas fa-cubes fa-2x logo-icon"></i>
            <h2 className="login-title">Logo</h2>
            <p className="login-subtitle">Sign into your account</p>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>
              <button type="submit" className="btn1">
                Login
              </button>

              <div className="form-links">
                <a href="/forgot-password" className="forgot-password">
                  Forgot password?
                </a>
                <p className="signup-text">
                  Don't have an account?{" "}
                  <Link to="/SignUp" className="signup-link">
                    Register here
                  </Link>
                </p>
              </div>
            </form>

            <div className="terms">
              <a href="/terms" className="small-text">
                Terms of use
              </a>
              <a href="/privacy" className="small-text">
                Privacy policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
