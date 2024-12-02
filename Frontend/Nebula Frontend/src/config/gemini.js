// // const apiKey = "AIzaSyArFLmyk5s3nfVTZ7bL0rBkWLzsaDqs0j4";

// /*
//  * Install the Generative AI SDK
//  *
//  * $ npm install @google/generative-ai
//  *
//  * See the getting started guide for more information
//  * https://ai.google.dev/gemini-api/docs/get-started/node
//  */


// import {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
//   }from "@google/generative-ai";
  
// //   const apiKey = process.env.GEMINI_API_KEY;
//  const apiKey = import.meta.env.VITE_Token1; // For Vite react app, for defining api in .env file, name should be prefix with VITE_ otherwise it will give error
 
//  const genAI = new GoogleGenerativeAI(apiKey);
  
//   const model = genAI.getGenerativeModel({
//     // model: "gemini-1.5-flash", // topk = 40, 1500 req / day
//     // model: "gemini-exp-1121", // topk = 64
//     // model: "gemini-exp-1114", // topk = 64
//     model: "gemini-1.5-pro", // topk = 50, 50 req / day
//   });
  
//   const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 40,
//     maxOutputTokens: 8192,
//     responseMimeType: "text/plain",
//   };
  
//   async function run(prompt,history) {
//     const chatSession = model.startChat({
//       generationConfig,
//    // safetySettings: Adjust safety settings
//    // See https://ai.google.dev/gemini-api/docs/safety-settings
//       history: [
//         {
//           role: "user",
//           parts: [
//             {text: "Can you generate image?"},
//           ],
//         },
//         {
//           role: "model",
//           parts: [
//             {text: "I can't directly generate images. I'm a text-based model, so I can't create or display visual content.  I can, however, provide you with descriptions that you can use with an image generation tool like:\n\n* **Midjourney:**  A popular choice known for its artistic and imaginative outputs.\n* **DALL-E 2 (OpenAI):**  Known for its realism and ability to follow complex prompts.\n* **Stable Diffusion:**  An open-source model that allows for a high degree of customization.\n* **Craiyon (formerly DALL-E mini):** A free and accessible option, though generally less sophisticated than the others.\n\nTo use these tools, you'll need to sign up for an account (some are free, others have subscription fees) and then type in a text prompt describing the image you want.  \n\nFor example, if you want a picture of a cat wearing a top hat, you could use the prompt: \"A fluffy cat wearing a tiny top hat, sitting in a Victorian armchair, oil painting style.\" The more descriptive your prompt, the better the results are likely to be.\n"},
//           ],
//         },
//         {
//           role: "user",
//           parts: [
//             {text: "what is database?"},
//           ],
//         },
//         {
//           role: "model",
//           parts: [
//             {text: "A database is an organized collection of structured information, or data, typically stored electronically in a computer system.  It is designed to efficiently store, retrieve, modify, and manage data.  Think of it like a well-organized filing cabinet, but for digital information.\n\nHere's a breakdown of key aspects:\n\n* **Organized:** Data is stored in a structured format, often in tables with rows (records) and columns (fields). This structure makes it easy to find and access specific information.\n* **Data Integrity:** Databases enforce rules to ensure data accuracy and consistency. For example, you might specify that a \"date of birth\" field must contain a valid date.\n* **Data Management:** Databases provide tools for managing data, including adding, updating, deleting, and querying (searching) information.\n* **Concurrent Access:** Multiple users can access and modify the database simultaneously without corrupting the data.  The database system manages these accesses to ensure data consistency.\n* **Security:** Databases often include security features to control who can access and modify data.\n\n**Types of Databases:**\n\n* **Relational Databases (RDBMS):** The most common type, using tables with rows and columns related by keys. Examples include MySQL, PostgreSQL, Oracle, and Microsoft SQL Server.\n* **NoSQL Databases:**  Designed for handling large volumes of unstructured or semi-structured data.  Examples include MongoDB, Cassandra, and Redis.\n* **Object-Oriented Databases:** Store data as objects, similar to object-oriented programming.\n* **Graph Databases:**  Focus on relationships between data points.  Useful for social networks, recommendation engines, etc.\n\n**Key Components of a Database System:**\n\n* **Data:** The actual information stored in the database.\n* **Database Management System (DBMS):**  The software that controls the creation, maintenance, and use of the database.  It acts as the intermediary between the user and the data.\n* **Database Schema:**  The structure or blueprint of the database, defining how data is organized.\n* **Users:** People or applications that interact with the database.\n\n**Why are databases important?**\n\nDatabases are essential for a vast array of applications, including:\n\n* **Business Applications:**  Storing customer information, sales records, inventory, and financial data.\n* **Web Applications:**  Powering websites and online services, from e-commerce platforms to social media networks.\n* **Scientific Research:**  Managing and analyzing large datasets.\n* **Mobile Apps:**  Storing user data and preferences.\n\n\nIn essence, databases are the backbone of most modern information systems, providing a reliable and efficient way to manage and access data.\n"},
//           ],
//         },
//       ],
//     });
  
//     const result = await chatSession.sendMessage(prompt);
//     const response = result.response.text()
//     console.log(result.response.text());
//     return response
//   }

  
  
//   export default run;




  import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  import { GoogleAIFileManager } from "@google/generative-ai/server";
import { assets } from "../assets/assets";
import axios from "axios";

  const apiKey = import.meta.env.VITE_Token1;
  const genAI = new GoogleGenerativeAI(apiKey);
  const fileManager = new GoogleAIFileManager(apiKey);
  
  /**
   * Uploads the given file to Gemini.
   *
   * See https://ai.google.dev/gemini-api/docs/prompting_with_media
   */
  // async function uploadToGemini(path, mimeType) {
  //   const uploadResult = await fileManager.uploadFile(path, {
  //     mimeType,
  //     displayName: path,
  //   });
  //   const file = uploadResult.file;
  //   console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
  //   return file;
  // }

  async function uploadToGemini(file, mimeType) {
    const uploadResult = await fileManager.uploadFile(file, {
      mimeType,
      displayName: file.name || "uploaded_file",
    });
    const uploadedFile = uploadResult.file;
    console.log(`Uploaded file ${uploadedFile.displayName} as: ${uploadedFile.name}`);
    return uploadedFile;
  }
  

  const model = genAI.getGenerativeModel({
    // model: "gemini-1.5-flash",
    model: "gemini-1.5-pro",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run(prompt,file) {
    // TODO Make these files available on the local file system
    // You may need to update the file paths

    // const files = [
    //   await uploadToGemini(file ,"image/png"),
    // ];
  
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "what is database?"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "A database is an organized collection of structured information, or data, typically stored electronically in a computer system.  It is designed to efficiently store, retrieve, modify, and manage data.  Think of it like a well-organized filing cabinet, but for digital information.\n\nHere's a breakdown of key aspects:\n\n* **Organized:** Data is stored in a structured format, often in tables with rows (records) and columns (fields). This structure makes it easy to find and access specific information.\n* **Data Integrity:** Databases enforce rules to ensure data accuracy and consistency. For example, you might specify that a \"date of birth\" field must contain a valid date.\n* **Data Management:** Databases provide tools for managing data, including adding, updating, deleting, and querying (searching) information.\n* **Concurrent Access:** Multiple users can access and modify the database simultaneously without corrupting the data.  The database system manages these accesses to ensure data consistency.\n* **Security:** Databases often include security features to control who can access and modify data.\n\n**Types of Databases:**\n\n* **Relational Databases (RDBMS):** The most common type, using tables with rows and columns related by keys. Examples include MySQL, PostgreSQL, Oracle, and Microsoft SQL Server.\n* **NoSQL Databases:**  Designed for handling large volumes of unstructured or semi-structured data.  Examples include MongoDB, Cassandra, and Redis.\n* **Object-Oriented Databases:** Store data as objects, similar to object-oriented programming.\n* **Graph Databases:**  Focus on relationships between data points.  Useful for social networks, recommendation engines, etc.\n\n**Key Components of a Database System:**\n\n* **Data:** The actual information stored in the database.\n* **Database Management System (DBMS):**  The software that controls the creation, maintenance, and use of the database.  It acts as the intermediary between the user and the data.\n* **Database Schema:**  The structure or blueprint of the database, defining how data is organized.\n* **Users:** People or applications that interact with the database.\n\n**Why are databases important?**\n\nDatabases are essential for a vast array of applications, including:\n\n* **Business Applications:**  Storing customer information, sales records, inventory, and financial data.\n* **Web Applications:**  Powering websites and online services, from e-commerce platforms to social media networks.\n* **Scientific Research:**  Managing and analyzing large datasets.\n* **Mobile Apps:**  Storing user data and preferences.\n\n\nIn essence, databases are the backbone of most modern information systems, providing a reliable and efficient way to manage and access data.\n"},
          ],
        },
        // {
        //   role: "user",
        //   parts: [
        //     {
        //       fileData: {
        //         mimeType: files[0].mimeType,
        //         fileUri: files[0].uri,
        //       },
        //     },
        //   ],
        // },
        {
          role: "model",
          parts: [
            {text: "The image appears to be a logo design for a company related to electronics or technology. Here's a breakdown of its elements and possible interpretations:\n\n* **Circuitry Motif:** The orange lines and circles clearly represent an electronic circuit or wiring diagram. This visually connects the logo to the technology industry.\n* **Central Component:** The rounded rectangular shape in the middle could symbolize a microchip, processor, or other crucial electronic component. It suggests the core of a technological solution.\n* **Connections:** The lines connecting the circles and the central rectangle emphasize connectivity, integration, and the flow of information or electricity.\n* **Color Choice:** The use of orange often signifies energy, enthusiasm, and creativity. It can also be associated with innovation and technology.\n* **Company Name:** \"Best of Electronic Tech Sol\" (likely short for \"Solutions\") clearly states the company's focus.  The repetition of the name in a smaller font below might be a design choice for emphasis or to provide a slightly different visual presentation.\n\nOverall, the logo communicates a message of technological expertise, innovative solutions, and connectivity. It's simple, modern, and easily recognizable. The design is suitable for a company that wants to project an image of being forward-thinking and reliable in the electronics field.\n"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage(prompt);
    const final_result = result.response.text();
    return final_result;
  }
  
  export default run;