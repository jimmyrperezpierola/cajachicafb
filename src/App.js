import React, {useContext} from 'react';
import './App.css';
// import Home from './components/pages/HomePage/Home';
// import SignUp from './components/pages/SignUp/SignUp';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Navbar from './components/NavBar/Navbar';
// import Footer from './components/pages/Footer/Footer';
// import CajaChica from './components/pages/CajaChica/CajaChica';
// import Administracion from './components/pages/Administracion/Administracion';
import { Router } from "@reach/router";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Application from "./components/Application";
import UserProvider from "./providers/UserProvider";
import ProfilePage from "./components/ProfilePage";
import { UserContext } from "./providers/UserProvider";

function App() {
  return (
    <UserProvider>
      <Application />
    </UserProvider>
    // <Router>
    //   <Navbar />
    //   <Switch>
    //     <Route path='/' exact component={Home} />
    //     <Route path='/cajachica' component={CajaChica} />
    //     <Route path='/administracion' component={Administracion} />
    //     <Route path='/sign-up' component={SignUp} />
    //   </Switch>
    //   <Footer />
    // </Router>
  );
}

export default App;
