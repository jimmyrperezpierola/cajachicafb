import React from 'react';
import './Account.css';

const Account= props => {
    return(
        <div className='account'>
            <img src={props.src} alt=""/>
        </div>
    );
}

export default Account;