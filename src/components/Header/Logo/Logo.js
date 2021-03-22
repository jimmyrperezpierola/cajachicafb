import React from 'react';
import './Logo.css';

const Logo = props => {
    return(
    <div className="logo">
        <img src={props.src} alt=""/> 
        <span>React</span>
    </div> 
    );   
}

export default Logo;
