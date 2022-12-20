import React, { Component } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import logo from './planexLogo.png'
import './HomeHeader.css';
import {BrowserRouter as Router,Routes, Route,  Link} from "react-router-dom"


export default class Header extends Component {
  render() {
    return (
        <>
        <Navbar fixed="top" collapseOnSelect expand="md" bg="white" variant='white' className='shadow navbar-back'>
            <Navbar.Brand href ="#planex">
                <img 
                    src={logo}
                    height="50"
                    weight="70"
                    className="d-inline-block align-top"
                    alt="logo"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav">	
                <span> </span>
				<span> </span>
				<span> </span>
            </Navbar.Toggle>
            <Navbar.Collapse id='responsive-navbar-nav' className='justify-content-end'>
                <Nav className="ms-auto" >
                    <Nav.Link  href="#planex" className='nav-item'>Home</Nav.Link>
                    <Nav.Link href="#about_us" className='nav-item'>About us</Nav.Link>
                    <Nav.Link href="#reviews" className='nav-item'>Reviews</Nav.Link>
                    <Nav.Link href="#contacts" className='nav-item'>Contacts</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
       </>

    )
  }
}
