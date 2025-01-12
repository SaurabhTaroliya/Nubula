import React, { useContext, useEffect } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Feature } from './components/Feature/Feature';
import { ContactUs } from './components/ContactUs/ContactUs';
import Profile from './components/Profile/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import { jwtDecode } from 'jwt-decode';
import { Context } from './context/context';
import Login from './components/Login/login';
import SignUp from './components/SignUp/signup';
import AboutUs from './components/AboutUs/AboutUs';
import { FinalChatBoard } from './components/FinalChatBoard/FinalChatBoard';



const App = () => {


  const router = createBrowserRouter([
    {
      path:"/",
      element:<Login/>,
    },
    {
      path:"/Login",
      element:<Login/>,
    },
    {
      path:"/SignUp",
      element:<SignUp/>,
    },
    {
      path:"/ChatApp",
      element:<ProtectedRoute element={<FinalChatBoard />} />,
    },
    {
      path:"/ContactUs",
      element:<ContactUs/>
    },
    {
      path:"/AboutUs",
      element:<AboutUs/>
    },
    {
      path:"/Profile",
      element:<Profile/>
    }
  ]);
  
  const {userInfo, setUserInfo,prevPrompt, setPrevPrompts} = useContext(Context);
  const userData = JSON.parse(localStorage.getItem("user"))

  useEffect(()=>{
    setUserInfo(userData)
  },[])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const userPromptHistory = user.userPromptHistory || '[]';
      // setUserInfo({
      //   "firstName": decodedToken.firstName,
      //   "lastName": decodedToken.lastName,
      //   "email": decodedToken.email,
      //   "password":decodedToken.password,
      //   "gender": decodedToken.gender,
      //   "id": decodedToken.id,
      //   "dateOfJoining": decodedToken.dateOfJoining,
      //   "userPromptHistory": userPromptHistory
      // });
      setPrevPrompts(userPromptHistory);
    }
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer/>
    </>
    // <Profile/>
    // <ContactUs/>
    // <Feature/>
    // <>
    //   {/* <Login/> */}
    //   <SignUp/>

    //   {/* <Sidebar/>
    //   <Main/> */}
    // </>
  )
}

export default App