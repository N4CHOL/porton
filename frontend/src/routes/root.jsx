//  Cyclomatic complexity of the code is 0

//  IMPORTS
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import LanguageProvider from '../components/languageProvider/LanguageProvider.jsx'
import Layout from "../modules/layout/layout.jsx";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Root() {
  const navigate = useNavigate();
  const [userRol, setUserRol] = useState("")

  useEffect(() => {
    // Retrieve the user data from local storage
    let user = JSON.parse(localStorage.getItem("user"));
    
    // Check if user is null or undefined
    if (!user) {
      console.log('User is not logged in');
      navigate("/login");
      return;
    }

    // Check user role and set userRol accordingly
    if (user.roles && (user.roles[0].roleId === "1" || user.roles[0].roleId === "2")) {
      setUserRol("admin");
    } else if (user.roles && user.roles[0].name === "Operario") {
      setUserRol("operator");
    } else {
      console.log('User is not an admin or a regular user');
      navigate("/login");
    }
  }, [navigate]);


  //  The layout component is encased by the language provider for ease of accesivility to language components
  return (
    <>
      <LanguageProvider>
        <ToastContainer/>
        <Layout userRol={userRol}/>
      </LanguageProvider>
    </>
  );
}