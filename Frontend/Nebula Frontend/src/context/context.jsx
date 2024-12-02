// // import 'regenerator-runtime/runtime';// It should be at the top of the file to reolve the error :(Rgenerator-runtime/runtime)

// // import { createContext, useState, useEffect } from "react";
// // import run from "../config/gemini";

// // // To include Speech Recognition functionality
// // import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// // import query from '../config/huggingFace';

// // export const Context = createContext();

// // const ContextProvider = (props) => {

// //     const {
// //         transcript,
// //         listening,
// //         resetTranscript,
// //         browserSupportsSpeechRecognition
// //       } = useSpeechRecognition();

// //     const [input, setInput] = useState("")
// //     const [recentPrompt, setRecentPrompt] = useState("")
// //     const [prevPrompts, setPrevPrompts] = useState([])
// //     const [showResult, setShowResult] = useState(false)
// //     const [loading, setLoading] = useState(false)
// //     const [resultData, setResultData] = useState("")
// //     let [responseType, setResponseType] = useState("text")
// //     let [imageUrl, setImageUrl] = useState("")

// //     const delayPara = (index,nextWord) => {
// //         setTimeout(() => {
// //             setResultData(prev => prev + nextWord)
// //         }, 75*index);
// //     }

// //     const newChat = () => {
// //         setLoading(false)
// //         setShowResult(false)
// //     }

// //     const onSent = async (prompt) =>{

// //         setResultData("")
// //         setLoading(true)
// //         setShowResult(true)
// //         let response;
// //         if (prompt !== undefined) {
// //             console.log("-------------inside if----------------");

// //             if (prompt.includes("image")) {
// //                 setResponseType("iamge")
// //                 console.log(responseType)
                
// //                 // response = await query(prompt)
// //                 // setImageUrl(response)
// //             }else{
// //                 response = await run(prompt)
// //             }

// //             setRecentPrompt(prompt)
// //             setPrevPrompts(prev => [...prev, prompt])
// //         }
// //         else{
// //             console.log("-----------------inside else---------------");

// //             setPrevPrompts(prev => [...prev, input])
// //             setRecentPrompt(input)

// //             if (prompt.includes("image")) {
// //                 setResponseType("image")
// //                 console.log(responseType)
// //                 // response = await query(input)
// //                 // setImageUrl(response)
// //             }else{
// //                 response = await run(input)
// //             }
// //         }

// //         if (!prompt.includes("image") ){
// //             let responseArray = response.split("**")
// //             let newResponse = "" ;
// //             for(let i =0; i < responseArray.length; i++){
// //                 if(i === 0 || i%2 !== 1){
// //                     newResponse += responseArray[i]
// //                 }
// //                 else{
// //                     newResponse += "<b>"+responseArray[i]+"</b>"
// //                 }
// //             }
// //             let newResponse2 = newResponse.split("*").join("</br>")
// //             let newResponseArray = newResponse2.split(" ")
// //             for(let i = 0; i <newResponseArray.length; i++){
// //                 const nextWord = newResponseArray[i]
// //                 delayPara(i,nextWord+" ")
// //         }
// //         }

        
// //         setLoading(false)
// //         setInput("")
// //         setResponseType("text")
// //         setImageUrl("")
// //     }
// //     const contextValue = {
// //         prevPrompts,
// //         setPrevPrompts,
// //         onSent,
// //         recentPrompt,
// //         setRecentPrompt,
// //         showResult,
// //         loading,
// //         resultData,
// //         input,
// //         setInput,
// //         newChat,
// //         transcript,
// //         listening,
// //         resetTranscript,
// //         browserSupportsSpeechRecognition,
// //         SpeechRecognition,
        
// //     }
// //     // onSent("What is the full form of HTML")

// //     return (
// //         <Context.Provider value={contextValue}>
// //             {props.children}
// //         </Context.Provider>
// //     )
// // }

// // export default ContextProvider;




import 'regenerator-runtime/runtime'; // Ensure the top import to resolve the runtime error

import { createContext, useState, useEffect } from "react";
import run from "../config/gemini";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import query from '../config/huggingFace';
import codeGenerator from "../config/codeGenerator";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Context = createContext();

const ContextProvider = (props) => {
    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [responseType, setResponseType] = useState("text");
    const [imageUrl, setImageUrl] = useState("");
    const [showFeature, setShowFeature] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [fileData, setFileData] = useState();
    const [extended, setExtended] = useState(false);

    
    // useEffect(() => {
    //     const storedUser = localStorage.getItem("user");
    //     if (storedUser) {
    //         setUserInfo(JSON.parse(storedUser));
    //     }
    // }, []);
    

    const baseUrl = "https://localhost:7260/api";

    // Helper function to display text slowly
    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    };

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
        setInput("");
        setRecentPrompt("");
        setResultData("");
        setImageUrl("");
        setResponseType("text");
    };

    // function formatGeneralResponse(responseText) {
    //     // Handle bold text (e.g., **bold text**)
    //     let formattedText = responseText
    //       .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") // Bold text
    //       .replace(/\*(.+?)\*/g, "<em>$1</em>") // Italic text
    //       .replace(/`(.+?)`/g, "<code>$1</code>") // Inline code
    //       .replace(/### (.+)/g, "<h3>$1</h3>") // H3 headings
    //       .replace(/## (.+)/g, "<h2>$1</h2>") // H2 headings
    //       .replace(/# (.+)/g, "<h1>$1</h1>")  // H1 headings
    //       .replace(/\n- (.+)/g, "<li>$1</li>") // Convert - to list items
    //       .replace(/\n/g, "<br>"); // Convert newlines to <br>
      
    //     // Wrap list items in <ul> tags (unordered list)
    //     formattedText = formattedText.replace(/<br><li>/g, "<ul><li>").replace(/<\/li><br>/g, "</li></ul><br>");
      
    //     // Format code blocks (```code```)
    //     formattedText = formattedText.replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>");
      
    //     // Cleanup and adjustments to maintain good HTML structure
    //     formattedText = formattedText.replace(/<br><br>/g, "<br>"); // Avoid double breaks
      
    //     return formattedText;
    //   }

      function formatGeneralResponse(responseText) {
        // Handle bold text (e.g., **bold text**)
        let formattedText = responseText
          .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") // Bold text
          .replace(/\*(.+?)\*/g, "<em>$1</em>") // Italic text
          .replace(/`(.+?)`/g, "<code>$1</code>") // Inline code
          .replace(/### (.+)/g, "<h3>$1</h3>") // H3 headings
          .replace(/## (.+)/g, "<h2>$1</h2>") // H2 headings
          .replace(/# (.+)/g, "<h1>$1</h1>") // H1 headings
          .replace(/\n- (.+)/g, "<li>$1</li>") // Convert - to list items
          .replace(/\n/g, "<br>"); // Convert newlines to <br>
      
        // Wrap list items in <ul> tags (unordered list)
        formattedText = formattedText.replace(/<br><li>/g, "<ul><li>").replace(/<\/li><br>/g, "</li></ul><br>");
      
        // Format code blocks (```code```)
        formattedText = formattedText.replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>");
      
        // Detect and replace links with clickable anchors
        formattedText = formattedText.replace(
          /(https?:\/\/[^\s]+)/g,
          '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
        );
      
        // Cleanup and adjustments to maintain good HTML structure
        formattedText = formattedText.replace(/<br><br>/g, "<br>"); // Avoid double breaks
      
        return formattedText;
      }
      

      function formatResponse(responseText) {
        let formattedText = responseText
          .replace(/## (.+?)\n/g, "<h2>$1</h2>") // H2 headers
          .replace(/### (.+?)\n/g, "<h3>$1</h3>") // H3 headers
          .replace(/#### (.+?)\n/g, "<h4>$1</h4>") // H4 headers
          .replace(/# (.+?)\n/g, "<h1>$1</h1>") // H1 headers
          .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") // Bold text
          .replace(/\*(.+?)\*/g, "<em>$1</em>") // Italic text
          .replace(/`(.+?)`/g, "<code>$1</code>") // Inline code
          .replace(/```(.*?)\n([\s\S]*?)```/g, "<pre><code>$2</code></pre>") // Code blocks
          .replace(/- (.+?)\n/g, "<ul><li>$1</li></ul>") // Unordered lists
          .replace(/^\n/gm, "<br>") // New lines to <br>
          .replace(/^\* (.+?)$/gm, "<ul><li>$1</li></ul>")// List items
          .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank>$1</a>'); // Convert URLs within the text into clickable links
    
        // Remove extra <ul> tags for consecutive list items
        formattedText = formattedText.replace(/<\/ul><ul>/g, "");
        
    
        return formattedText;
      }

    //   function formatResponse(responseText) {
    //     let formattedText = responseText
    //         .replace(/## (.+?)\n/g, "$1") // H2 headers
    //         .replace(/### (.+?)\n/g, "$1") // H3 headers
    //         .replace(/#### (.+?)\n/g, "$1") // H4 headers
    //         .replace(/# (.+?)\n/g, "$1") // H1 headers
    //         .replace(/\*\*(.+?)\*\*/g, "$1") // Bold text
    //         .replace(/\*(.+?)\*/g, "$1") // Italic text
    //         .replace(/`(.+?)`/g, "$1") // Inline code
    //         .replace(/```(.*?)\n([\s\S]*?)```/g, "$2") // Code blocks
    //         .replace(/- (.+?)\n/g, "$1") // Unordered lists
    //         .replace(/^\n/gm, "") // New lines to 
    //         .replace(/^\* (.+?)$/gm, "$1") // List items
    //         .replace(/&lt;\/ul&gt;/g, ""); // Remove extra </ul> tags
    
    //     // Convert URLs within the text into clickable links
    //     formattedText = formattedText.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank>$1</a>');
    
    //     return formattedText;
    // }
      
    

    const handlePromptType = (prompt) => {
        // Check if the prompt contains "image" to determine responseType
        if (prompt.includes("image")) {
            setResponseType("image");
            return "image";  // Indicates image response
        }else if (prompt.includes("code")) {
            setResponseType("text");
            return "code";
        }
         else {
            setResponseType("text");
            return "text"; // Indicates text response
        }
    };

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        
        // Determine if it's an image or text prompt before making API calls
        const promptType = handlePromptType(prompt);
        let response;
        // const promptType ='xyz';

        // Make the appropriate API call based on responseType
        try {
            if (promptType === "image") {
                response = await query(prompt);  // Assuming query returns an image URL
                setImageUrl(response);
            }else if (promptType === "code") {
                const code = await codeGenerator(prompt);
                response = formatGeneralResponse(code);
            }
             else {
                // setUserInfo({
                //     ...userInfo,
                //     userPromptHistory: [...userInfo.userPromptHistory, prompt]
                //   });
                  setUserInfo((prev) => ({
                    ...prev,
                    userPromptHistory: [...(prev.userPromptHistory || []), prompt],
                }));
                // userInfo.userPromptHistory = [...userInfo.userPromptHistory, prompt]
                response = await run(prompt,fileData);  // Handles text response
                // response = formatResponse(response)
                response = formatGeneralResponse(response)
            }

            // Set recent prompt and previous prompts
            setRecentPrompt(prompt);
            setPrevPrompts(prev => [...prev, prompt]);
            
            // API Call to update User Prompt History
            const id = userInfo.id;
            const url = `${baseUrl}/User/Update/${id}`;
            // userInfo.userPromptHistory = [...userInfo.userPromptHistory, prompt]; // because intially userPromptHistory is undefined
            try {
            //   const response = await axios.put(url,
            //     userInfo
            //   );

                await axios.put(url, {
                    ...userInfo,
                    userPromptHistory: [
                        ...userInfo.userPromptHistory,
                        prompt
                    ]
                });

                console.log(userInfo);
                localStorage.removeItem("user"); // Clear localStorage with particular Key
                localStorage.setItem("user",JSON.stringify(userInfo)); // Update the loacalStorage of Key - "user"
                
            }
            catch(error){
                console.log((error));
                
            }

            setResultData(response);
            if (response && responseType === "text") {
                // Handle displaying the text response word by word
                
                let splitResponse = response.split(" ");
                splitResponse.forEach((word, i) => delayPara(i, word + " "));
            }
        } catch (error) {
            console.error("Error fetching the response:", error);
        }

        setLoading(false);
        setInput("");
    };

    const contextValue = {
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
        newChat,
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
        fileData,
        setFileData,
        extended,
        setExtended
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;


// import 'regenerator-runtime/runtime'; // Ensure the top import to resolve the runtime error
// import { createContext, useState } from "react";
// import run from "../config/gemini";
// import query from '../config/huggingFace';
// import codeGenerator from "../config/codeGenerator";
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// export const Context = createContext();

// const ContextProvider = (props) => {
//     const [input, setInput] = useState("");
//     const [recentPrompt, setRecentPrompt] = useState("");
//     const [prevPrompts, setPrevPrompts] = useState([]);
//     const [showResult, setShowResult] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [resultData, setResultData] = useState("");
//     const [responseType, setResponseType] = useState("text");
//     const [imageUrl, setImageUrl] = useState("");

//     const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();


//     const newChat = () => {
//         setLoading(false);
//         setShowResult(false);
//         setInput("");
//         setRecentPrompt("");
//         setResultData("");
//         setImageUrl("");
//         setResponseType("text");
//     };

//     // Function to format code or regular text
//     function formatGeneralResponse(responseText) {
//         let formattedText = responseText
//             .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") // Bold text
//             .replace(/\*(.+?)\*/g, "<em>$1</em>") // Italic text
//             .replace(/`(.+?)`/g, "<code>$1</code>") // Inline code
//             .replace(/### (.+)/g, "<h3>$1</h3>") // H3 headings
//             .replace(/## (.+)/g, "<h2>$1</h2>") // H2 headings
//             .replace(/# (.+)/g, "<h1>$1</h1>")  // H1 headings
//             .replace(/\n- (.+)/g, "<li>$1</li>") // Convert - to list items
//             .replace(/\n/g, "<br>") // Convert newlines to <br>
//             .replace(/```(html|css|javascript)\n([\s\S]*?)```/g, (match, lang, code) => {
//                 return `<pre><code class="language-${lang}">${code}</code></pre>`;
//             }); // Format code blocks (```code```) for Prism.js

//         // Wrap list items in <ul> tags
//         formattedText = formattedText.replace(/<br><li>/g, "<ul><li>").replace(/<\/li><br>/g, "</li></ul><br>");
//         formattedText = formattedText.replace(/<br><br>/g, "<br>"); // Avoid double breaks
//         return formattedText;
//     }

//     function formatResponse(responseText) {
//         let formattedText = responseText
//             .replace(/## (.+?)\n/g, "<h2>$1</h2>") // H2 headers
//             .replace(/### (.+?)\n/g, "<h3>$1</h3>") // H3 headers
//             .replace(/#### (.+?)\n/g, "<h4>$1</h4>") // H4 headers
//             .replace(/# (.+?)\n/g, "<h1>$1</h1>") // H1 headers
//             .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") // Bold text
//             .replace(/\*(.+?)\*/g, "<em>$1</em>") // Italic text
//             .replace(/`(.+?)`/g, "<code>$1</code>") // Inline code
//             .replace(/```(html|css|javascript)\n([\s\S]*?)```/g, (match, lang, code) => {
//                 return `<pre><code class="language-${lang}">${code}</code></pre>`;
//             }) // Format code blocks for Prism.js
//             .replace(/- (.+?)\n/g, "<ul><li>$1</li></ul>") // Unordered lists
//             .replace(/^\n/gm, "<br>"); // New lines to <br>

//         formattedText = formattedText.replace(/<\/ul><ul>/g, ""); // Remove extra <ul> tags
//         return formattedText;
//     }

//     const handlePromptType = (prompt) => {
//         if (prompt.includes("image")) {
//             setResponseType("image");
//             return "image";  // Indicates image response
//         } else if (prompt.includes("code")) {
//             setResponseType("text");
//             return "code";
//         } else {
//             setResponseType("text");
//             return "text"; // Indicates text response
//         }
//     };

//     const onSent = async (prompt) => {
//         setResultData("");
//         setLoading(true);
//         setShowResult(true);
        
//         // Determine the type of response before making API calls
//         const promptType = handlePromptType(prompt);
//         let response;

//         try {
//             if (promptType === "image") {
//                 response = await query(prompt);  // Assuming query returns an image URL
//                 setImageUrl(response);
//             } else if (promptType === "code") {
//                 const code = await codeGenerator(prompt);
//                 response = formatGeneralResponse(code);  // Format code response
//             } else {
//                 response = await run(prompt);  // Handles text response
//                 response = formatResponse(response); // Format text response
//             }

//             setRecentPrompt(prompt);
//             setPrevPrompts(prev => [...prev, prompt]);
//             setResultData(response);
//         } catch (error) {
//             console.error("Error fetching the response:", error);
//         }

//         setLoading(false);
//         setInput("");
//     };

//     const contextValue = {
//         prevPrompts,
//         setPrevPrompts,
//         onSent,
//         recentPrompt,
//         setRecentPrompt,
//         showResult,
//         loading,
//         resultData,
//         input,
//         setInput,
//         newChat,
//         transcript,
//         listening,
//         resetTranscript,
//         browserSupportsSpeechRecognition,
//         SpeechRecognition,
//         responseType,
//         imageUrl,
//     };

//     return (
//         <Context.Provider value={contextValue}>
//             {props.children}
//         </Context.Provider>
//     );
// };

// export default ContextProvider;


