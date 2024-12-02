import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, useNavigate } from "react-router-dom";
import "./Feature.css";
import { TbLogout } from "react-icons/tb";
import { RiToggleLine } from "react-icons/ri";
import { MdOutlineManageAccounts } from "react-icons/md";
import { MdContactMail } from "react-icons/md";
import { FcAbout } from "react-icons/fc";
import { Context } from "../../context/context";
import Profile from "../Profile/Profile";


export const Feature = () => {
  const {showFeature, setShowFeature} = useContext(Context)

  const navigate = useNavigate();

  const logout = () =>{
    localStorage.clear();
    navigate('/Login');
  }

  const contactUs = () =>{
    navigate('/ContactUs');
  }

  const AboutUs = () =>{
    navigate('/AboutUs');
  }

  const Profile = () =>{
    navigate('/Profile');
  }

  return (
    // <Card style={{ width: "18rem" }}>
    //   <Card.Header>Featured</Card.Header>
    //   <ListGroup variant="flush">
    //     <ListGroup.Item>Cras justo odio</ListGroup.Item>
    //     <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
    //     <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
    //   </ListGroup>
    // </Card>

    <div className="features">
      <div className="feature" onClick={Profile}>
        <MdOutlineManageAccounts />
        <Link className="item">Profile</Link>
      </div>
      <div className="feature" onClick={contactUs}>
        <MdContactMail />
        <Link className="item">Contact Us</Link>
      </div>
      <div className="feature" onClick={AboutUs}>
        <FcAbout />
        <Link className="item">About Us</Link>
      </div>
      <div className="feature">
        <RiToggleLine />
        <Link className="item">Theme</Link>
      </div>
      <div className="feature" onClick={logout}>
        <TbLogout />
        <Link className="item">Logout</Link>
      </div>
    </div>
  );
};
