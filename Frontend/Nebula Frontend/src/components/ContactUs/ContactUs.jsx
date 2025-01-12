import React, { useContext, useEffect, useState } from "react";
import { Input, Ripple, initMDB } from "mdb-ui-kit";
import 'mdb-ui-kit/css/mdb.min.css'; // Import MDB CSS
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Context } from "../../context/context";


export const ContactUs = () => {
  const {userInfo, setUserInfo} = useContext(Context);
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  // const [email, setEmail] = useState(userInfo.email);
  const [messageError, setMessageError] = useState("");

  const [message, setMessage] = useState("");

  const baseUrl = "https://localhost:7260/api";

  useEffect(() => {
    initMDB({ Input, Ripple });
  }, []);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const validateForm = () => {
    let isValid = true;
    if (!message) {
      setMessageError("Message is required");
      isValid = false;
    } else {
      setMessageError("");
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission
    // Add your form submission logic here

    if (!validateForm()) {
      return;
    }
    const url = `${baseUrl}/User/Contact`;
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const data ={
      Name : `${userInfo.firstname} ${userInfo.lastname}`,
      Email: userInfo.email,
      Message: message
    }
    const response = axios.post(url, data)
    try {
      console.log(response)
      navigate("/chatApp");
      
    } catch (error) {
      console.log(error.message);
      
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',width:'100vw', height: '100vh', padding:'1rem' }}>
      <form style={{ width: '26rem' }}>
        {/* Name input */}
        <div data-mdb-input-init className="form-outline mb-4">
          <input value={`${userInfo.firstname} ${userInfo.lastname}`} type="text" id="form4Example1" className="form-control" readOnly/>
          <label className="form-label" htmlFor="form4Example1">Name</label>
        </div>

        {/* Email input */}
        <div data-mdb-input-init className="form-outline mb-4">
          <input value={userInfo.email} onChange={(e) => setEmail(e.target.value)} type="email" id="form4Example2" className="form-control" readOnly/>
          <label className="form-label" htmlFor="form4Example2">Email address</label>
        </div> 

        {/* Message input */}
        <div data-mdb-input-init className="form-outline mb-4">
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="form-control" id="form4Example3" rows="4"></textarea>
          <label className="form-label" htmlFor="form4Example3">Message</label>
        </div>

        {/* Checkbox */}
        {/* <div className="form-check d-flex justify-content-center mb-4">
          <input
            className="form-check-input me-2"
            type="checkbox"
            value=""
            id="form4Example4"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor="form4Example4">
            Send me a copy of this message
          </label>
        </div> */}

        {/* Submit button */}
        <button onSubmit={(e)=> handleSubmit(e)}
          data-mdb-ripple-init
          type="submit"
          className="btn btn-primary btn-block mb-4"
          style={{ marginTop: '0' }} // Ensure no margin shift
        >
          Send
        </button>
        <button onClick={() => navigate('/ChatApp') }
          data-mdb-ripple-init
          type="submit"
          className="btn btn-primary btn-block mb-4"
          style={{ marginTop: '0' }} // Ensure no margin shift
        >
          Close
        </button>
      </form>
    </div>
  );
};
