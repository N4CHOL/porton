// components/PrivateRoute.jsx
// eslint-disable-next-line no-unused-vars
import { React, useEffect,useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../utilities/context/AuthContext';


const PrivateRoute = ({ children, allowedTypes }) => {
  const [user,setUser] = useState(JSON.parse(localStorage.getItem("user")))
  const { isAuthenticated } = useAuth();
  
  const userType = user.roles[0].name

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []); // Empty dependency array means this effect runs only once after mounting



  if (allowedTypes && !allowedTypes.includes(userType)) {
    return <Navigate to="/unauthorized" />;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;



};

export default PrivateRoute;