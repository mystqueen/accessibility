import React, { useState } from 'react'
import './LoginSignup.css'

import { FaUserAlt, FaEnvelope,FaLock } from 'react-icons/fa';

export const LoginSignup = () => {
    const [action,setAction] = useState("Sign Up");
  return (
    <div classname='container'>
        <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
            {action==="Login"?null:<div className="input">
                <FaUserAlt size={20} color="#333"/>
                <input type="text" placeholder='Full Name'/>
            </div>}
            {action==="Login"?null:<div className="input">
                <FaEnvelope size={20} color="#333"/>
                <input type="email" placeholder='Email'/>
            </div>
            }
            
            <div className="input">
                <FaUserAlt size={20} color="#333"/>
                <input type="text" placeholder='Student ID'/>
            </div>

            <div className="input">
                <FaLock size={20} color="#333"/>
                <input type="password" placeholder='Password'/>
            </div>
        </div>
        {action==="Sign Up"?null:<div className="forgot-password">Lost Password? <span>Click Here</span></div>}
        
        <div className="submit-container">
           <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
           <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div> 
        </div>
    </div>
  )
}
