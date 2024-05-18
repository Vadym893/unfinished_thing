import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import logo from '../img/logo.png';
import { store } from "../actions/reducers";
import { actionAuthLogout } from '../actions/promises';
export const Main=() => {

  return (
    <>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
    <Navbar bg="dark" variant="dark">
      <Container className="headerContainer">
        <img src={logo} alt="Logo" className='logo' />
        <Nav className="header">
          <Nav.Link  className='icon'><Link to={"/main"}><div className='homeicon' ></div></Link></Nav.Link>
          <Nav.Link className='iconHolder icon'><Link  to={"/myInfo"}><div className='myinfoicon' ></div></Link></Nav.Link>
          <Nav.Link  className='iconHolder icon'><Link  to={`/login`} onClick={()=>store.dispatch(actionAuthLogout())}><div className='logOutIcon' ></div></Link></Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    </>
  );
}

export const CMain = connect(null)(
  Main
);