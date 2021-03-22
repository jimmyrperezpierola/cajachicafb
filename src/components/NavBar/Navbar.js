import React, { useState, useEffect } from 'react';
import { Button } from '../Button/Button';
// import { Link } from 'react-router-dom';
import { Link, Router } from "@reach/router";
import './Navbar.css';
import { MdFingerprint } from 'react-icons/md';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { GiMoneyStack } from "react-icons/gi";
import SignIn from "../SignIn";
// import SignUp from "../SignUp__";
import PasswordReset from "../PasswordReset";
import CajaChica from "../CajaChicaForm/CajaChicaForm";
import Administracion from '../pages/Administracion/Administracion';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    window.addEventListener('resize', showButton);
    return() => window.removeEventListener('resize', showButton);  
  }, []);


  return (
    <>
    <Router>
      <SignIn path="/" />
      {/* <SignUp path="signUp" /> */}
      <CajaChica path="cajachica" />
      <Administracion path="administracion" />
      <PasswordReset path = "passwordReset" />
    </Router>

      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className='navbar'>
          <div className='navbar-container container'>
            <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
              <GiMoneyStack className='navbar-icon' />
              IO Caja Chica
            </Link>
            <div className='menu-icon' onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className='nav-item'>
                <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                  Inicio
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/cajachica'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Transacciones
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/administracion'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Administracion
                </Link>
              </li>
              <li className='nav-btn'>
                {button ? (
                  <Link to='/signUp' className='btn-link'>
                    <Button buttonStyle='btn--outline'>SIGN UP</Button>
                  </Link>
                ) : (
                  <Link to='/signUp' className='btn-link'>
                    <Button
                      buttonStyle='btn--outline'
                      buttonSize='btn--mobile'
                      onClick={closeMobileMenu}
                    >
                      SIGN UP
                    </Button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
