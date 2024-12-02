import { assets } from "../../assets/assets";
import { Context } from "../../context/context";
import { Feature } from "../Feature/Feature";
import "./Main.css";
import React, { useContext, useEffect, useState } from "react";
import { cards } from "../../data/data.jsx";
import { Navbar } from "../NavBar/Navbar.jsx";

const Main = () => {
  const {
    prevPrompts,
    setPrevPrompts,
    onSent,
    recentPrompt,
    setRecentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    SpeechRecognition,
    responseType,
    imageUrl,
    showFeature,
    setShowFeature,
    userInfo,
    setUserInfo,
    setFileData
  } = useContext(Context);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  useEffect(() => {
    setInput(transcript);
    console.log(transcript);
  }, [transcript]);

  // const handleClick = () => {
  //   setShowFeature((prev) => !prev);
  // };

  const handleOnClick = (prompt) => {
    setInput(prompt);
    onSent(prompt);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileData(file);
      };
      reader.readAsDataURL(file);
    }

    {file ? console.log("file selected"): console.log("No file selected");}
    // onSent("Find useful insight from this image",file)

  };

  console.log(userInfo);

  return (
    <>
    <div className="main dark-mode">
      {/* <div className="nav">
        <p>Nebula</p>
        <img
          onClick={() => handleClick()}
          src={userInfo.imageUrl || assets.user_icon}
          alt="user-icon"
        />
        {showFeature && <Feature />}
      </div> */}
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, {JSON.parse(localStorage.getItem('user')).firstname} </span>
              </p>
              <p>How can I help today?</p>
            </div>
            <div className="cards">
              {cards.map((card, index) => {
                return (
                  <div
                    className="card"
                    key={index}
                    onClick={() => handleOnClick(card.detailedPrompt)}
                  >
                    <div className="Card-Header">
                      {card.icon}
                      <h6>{card.Heading}</h6>
                    </div>
                    <p> {card.shortPrompt} </p>
                    {/* <img src={card.icon} alt="" /> */}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img id="profile-img" src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {
                loading ? (
                  <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                  </div>
                ) : (
                  <div className="response">
                    {responseType === "image" ? (
                      <img id="imgUrl" src={imageUrl} alt="" />
                    ) : (
                      <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                    )}
                  </div>
                )
                // <p dangerouslySetInnerHTML={{__html:resultData}} ></p>
              }
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            {/* <form onSubmit={() => onSent(input)}>

              <div>
                <label htmlFor="text-input">Text:</label>
                <input
                  id="text-input"
                  type="text"
                  value={input}
                  onChange={()=>setInput(input)}
                />
              </div>
              <div>
                <label htmlFor="file-input">Image:</label>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <button type="submit" onClick={() => onSent(input)}>Submit</button>
            </form> */}

            <input
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSent(input);
                }
              }}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <label htmlFor="fileInput" className="custom-file-input">
                <img src={assets.gallery_icon} alt="" />
              </label>
              <input
                id="fileInput"
                type="file"
                accept="image/png"
                onChange={handleImageChange}
              />
              <img
                onClick={SpeechRecognition.startListening}
                src={assets.mic_icon}
                alt=""
              />
              <img
                onClick={() => onSent(input)}
                src={assets.send_icon}
                alt=""
              />
            </div>
          </div>
          <p className="bottom-info">
            Nebula may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Nebula Apps
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Main;
