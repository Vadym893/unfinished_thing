import React, { useState } from "react";
import { connect } from "react-redux";
import { actionFullLogin } from "../gql/scripts";
import {Link} from "react-router-dom";

export const Login = ({ onLog }) => {
  const [login, getLogin] = useState("");
  const [password, getPassword] = useState("");
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
              <form>
                  <h3>Login Here</h3>

                  <label htmlFor="username">Username</label>
                  <input type="text"  id="username" value={login} onChange={(e) => getLogin(e.target.value)}></input>

                  <label htmlFor="password">Password</label>
                  <input type="password"  id="password"value={password} onChange={(e) => getPassword(e.target.value)}></input>
              
                  <button type="button" className="burronReg" onClick={() => onLog(login, password)}>
                  <Link to={`/main`}>Log in</Link>
                  </button>
                  <h5 color="red">Don't have an account yet?</h5>
                  <Link to="/registration">Register</Link>
              </form>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export const CLogin = connect(null,{ onLog: actionFullLogin })(
  Login
);