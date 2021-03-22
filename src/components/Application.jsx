import React, { useContext } from "react";
import { Router } from "@reach/router";
//import { Router } from 'react-router-dom';
import SignIn from "./SignIn";
import SignUp from "./SignUp__";
import UserProvider from "../providers/UserProvider";
import ProfilePage from "./ProfilePage";
import Home from './pages/HomePage/Home';
import { UserContext } from "../providers/UserProvider";
import PasswordReset from "./PasswordReset";
import Navbar from './NavBar/Navbar';
import Footer from './pages/Footer/Footer';

function Application() {
  const user = useContext(UserContext);
  return (
        user ?
        <>
          <Navbar /> 
          <Home />
          <Footer />
        </>
      :
        <Router>
          <SignUp path="signUp" />
          <SignIn path="/" />
          <PasswordReset path = "passwordReset" />
        </Router>
      
  );
}

export default Application;
