
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Protected(props) {
  const { component: Component, allowedRoles } = props;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : '';
  const role = decodedToken ? decodedToken.role : 'user';
  
  useEffect(() => {
    if (!token) {
      return  navigate("/");
    } 
    if(token) {
      // Check if the user's role is allowed to access the route
      if (!allowedRoles.includes(role)) {
        if(role=='learner'){
            return navigate('/unauthorized', { state: { role } })
            // return navigate('/learner/');
          }else if(role=='tutor'){
            // If the user's role is not allowed, redirect to an unauthorized page
            return navigate('/unauthorized', { state: { role } })
            // return navigate('/tutor/');
          }
          
        }
      }
    },[]);

    return <Component />;
  }
  
  export default Protected;