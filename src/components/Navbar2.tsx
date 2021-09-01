import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useState } from 'react';
import logo from '../assets/icons/logo.png';
import user_icon from '../assets/icons/user-icon.png'
const NavBar = () => {
    let isLoggedin = '!loggedin';
    let userName = 'userName';

    return (
        <Navbar bg="light" expand="lg">
            <Container className='py-2'>
                <Navbar.Brand href="/">
                    <img src={logo} className='pl-md-5 ml-lg-3' width='auto' height='40px' alt='logo' />
                </Navbar.Brand>
                {isLoggedin === 'loggedin' ?
                    (<>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/browse" style={{ fontWeight: 'bold', color: '#2EAF7D' }} >BROWSE</Nav.Link>
                                <Nav.Link href="/create-post">CREATE POST</Nav.Link>
                                
                                <NavDropdown title={userName} id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#">EDIT PROFILE</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#">LOG OUT</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </>) :
                    (<>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav >
                                <Nav.Link href="/signin">SIGN IN</Nav.Link>
                                <Nav.Link style={{border: '0.1px solid', borderRadius: '5px'}} href="/signup">SIGN UP</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </>)}
            </Container>

        </Navbar>
        // <Navbar sticky='top' className="navbar navbar-expand-lg navbar-light bg-light py-3">
        //   <a className="navbar-brand mr-0" href="/">
        //     <img src={logo} className='pl-md-5 ml-lg-3' width='auto' height='40px' alt='logo' />
        //   </a>
        //   {isLoggedin === 'loggedin' ? (<>



        //   </>)
        //     :
        //     (
        //       <>

        //       </>
        //     )
        //   }
        // </Navbar>
    )
}
export default NavBar;