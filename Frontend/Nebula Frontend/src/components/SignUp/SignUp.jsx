import React, { useState } from 'react';
import './SignUp.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignUp = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [imageUrl, setImageUrl] = useState(`${assets.user_icon}`);
  const navigate = useNavigate();
  const baseUrl = "https://localhost:7260/api";

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ firstname, lastname, email, password, gender, imageUrl });

    const url = `${baseUrl}/User/SignUp`;
    try {
      const response = await axios.post(url, {
        firstname,
        lastname,
        email,
        password,
        gender,
        imageUrl
      });
      console.log(response);
      console.log(response.data);
      
      

      if (response && response.data) {
        toast.success("Successful Signup")
        console.log('SignUp successful:', response.data);
        // Navigate to the main page or show the sidebar and main components
        navigate('/Login'); //We know /ChatApp is the route for Sidebar and Main components
      } else {
        console.log("SignUp Unsuccessful: No data received");
      }
    } catch (error) {
      if (error.response) {
        toast.warn(error.response.data.message);
        
        // toast.warn(error.data.message);
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('SignUp failed:', error.response.data.message);
      } else if (error.request) {
        toast.error(error.message);
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        toast.error(error.message);
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message);
      }
    }

  };

  return (
    <div className="sign-up-page">
      <div className="sign-up-container">
        {/* Left side: Image */}
        <div className="sign-up-image">
          <img
            src={assets.nebula} // Replace with actual image URL
            alt="SignUp visual"
          />
        </div>

        {/* Right side: Form */}
        <div className="sign-up-form-container">
          <div className="sign-up-content">
            <h2 className="sign-up-title">Create your account</h2>

            <form onSubmit={handleSubmit} className="sign-up-form">
              {/* First Name and Last Name */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstname"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastname"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>

              {/* Email */}
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

              {/* Password */}
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

              {/* Gender */}
              <div className="form-group">
                <label className="gender-label">Gender</label>
                <div className="gender-options">
                  <label className="gender-option">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={gender === 'Male'}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    Male
                  </label>
                  <label className="gender-option">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={gender === 'Female'}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    Female
                  </label>
                  <label className="gender-option">
                    <input
                      type="radio"
                      name="gender"
                      value="Other"
                      checked={gender === 'Other'}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    Other
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn1">Sign Up</button>

              <div className="form-links">
                <p className="login-text">
                  Already have an account? <Link className="login-link" to="/"> Login here </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
