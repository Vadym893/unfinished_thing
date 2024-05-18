import React, { useState } from "react";
import { connect } from "react-redux";
import { actionFullRegister } from "../gql/scripts";
import {Link} from "react-router-dom";

export const Registration = ({ onReg }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  let checkIdenticalPassword = false;
  if (password !== checkPassword) {
    checkIdenticalPassword = true;
  }
  return (
    <>
    <div className="container">
        <div className="background-img">
          <div className="box">
            <div className="content">
              <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
              </div>
              <form className="RegForm">
                <h1 id="regHeader">Registration</h1>
                
                <label htmlFor="username">Username</label>
                <input type="text"  id="username" value={login} onChange={(e) => setLogin(e.target.value)}></input>

                <label htmlFor="password">Password</label>
                <input type="password"  id="password"value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <label htmlFor="Checkpassword">Check Password</label>
                <input type="password"  id="Checkpassword"value={checkPassword} onChange={(e) => setCheckPassword(e.target.value)}></input>

                <button
                  type="button"
                  className="burronReg"
                  disabled={checkIdenticalPassword}
                  onClick={() => onReg(login, password)}
                >
                  <Link to={`/login`}>Register</Link>
                </button>

              </form>
              <div className="logDiv">
                <p className="TextToLOg" color="green">Already has an account?</p>
                <Link to="/login">Log in</Link>
              </div>
            </div>
            </div>
          </div>
        
      </div>
    </>
  );
};
export const CRegistration = connect(null,{ onReg: actionFullRegister })(
  Registration
);
