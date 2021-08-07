import { Nav } from "react-bootstrap";
import { useState } from 'react';
import logo from '../assets/icons/logo.png';
import user_icon from '../assets/icons/user-icon.png'
const Navbar = () => {
  let isLoggedin = 'loggedin';
  let userName = 'userName';

  return (
    <Nav className="navbar navbar-expand-lg navbar-light bg-light py-3">
      <a className="navbar-brand mr-0" href="/">
        <img src={logo} className='pl-md-5 ml-lg-3' width='auto' height='40px' alt='logo' />
      </a>
      {isLoggedin === 'loggedin' ? (<>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto pr-md-5 mr-lg-3">
            <li className="nav-item active">
              <a className="nav-link p-1 px-3" href="#" style={{ fontWeight: 'bold', color: '#2EAF7D' }}>BROWSE</a> {/*NOT SURE WHRE TO GO? */}
            </li>
            <li className="nav-item">
              <a className="nav-link p-1 px-3" href="/create-post">CREATE POST</a> {/*NOT SURE WHRE TO GO? */}
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle p-1 px-3" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src={user_icon} className='mb-1 mr-1' width='25px' height='25px' alt='user-icon'/>
                {userName}
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">EDIT PROFILE</a>
                <a className="dropdown-item" href="#">DARK THEME</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">LOG OUT</a>
              </div>
            </li>
          </ul>
        </div>
      </>)
        :
        (
          <>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto pr-md-5 mr-lg-3">
                <li className="nav-item">
                  <a className="nav-link p-1 px-3" href="/signin">SIGN IN</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link p-1 px-3" style={{ border: '0.1px solid', borderRadius: '5px' }} href="/signup">SIGN UP</a>
                </li>
              </ul>
            </div>
          </>
        )
      }
    </Nav>
  )
}
export default Navbar;