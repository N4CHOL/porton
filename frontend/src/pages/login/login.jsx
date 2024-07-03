//  Edges (E): There are no explicit decision points, so there are no edges to consider.
//  Nodes (N): There are four nodes: LanguageProvider, Logo, LoginForm, and the div containing potential additional content.
//  The cyclomatic complexity is 0

//  Import
// eslint-disable-next-line no-unused-vars
import React from 'react';
import '../login/login.css';
import LoginForm from '../../modules/loginForm/loginForm.jsx';
import LanguageProvider from '../../components/languageProvider/LanguageProvider.jsx';
import Logo from '../../components/logo/logo.jsx';

function Login() {
  // Wrap the login page content with LanguageProvider
  return (
    <LanguageProvider>
      {/* Container for the login page */}
      <div className="flex justify-center items-center h-screen loginPage">
        {/* Center content horizontally */}
        <div className="flex justify-center items-center">
          {/* Login card */}
          <div className="loginCard">
             {/* Logo with a witdh prop */}
            <div className="flex justify-center items-center">
              <Logo width={200} />

            </div>
           
            <LoginForm />
          </div>
        </div>
      </div>
    </LanguageProvider>
  );
}

export default Login;