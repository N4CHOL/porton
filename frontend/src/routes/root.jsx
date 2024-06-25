//  Cyclomatic complexity of the code is 0

//  IMPORTS
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import LanguageProvider from '../components/languageProvider/LanguageProvider.jsx'
import Layout from "../modules/layout/layout.jsx";
import { useNavigate } from "react-router-dom";


export default function Root() {
  const navigate = useNavigate();
  const [userRol, setUserRol] = useState("")

  useEffect(() => {
    // Retrieve the user data from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    // Check if user role exists and perform actions based on its value
    if (user && (user.roles[0].roleId === "1" || user.roles[0].roleId === "2")) {
      // Example: Redirect to admin dashboard
      // history.push('/admin');
      setUserRol("admin")

    } else if (user && user.roles[0].name === "Operario") {
      // Example: Redirect to user dashboard
      // history.push('/user');
      setUserRol("operator")
    } else {
      console.log('User is not an admin or a regular user');
      navigate("/login");

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  //  The layout component is encased by the language provider for ease of accesivility to language components
  return (
    <>
      <LanguageProvider>
        <Layout userRol={userRol}/>
      </LanguageProvider>
    </>
  );
}