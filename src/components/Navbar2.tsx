import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { useState } from 'react'
import logo from '../assets/icons/logo.png'
import user_icon from '../assets/icons/user-icon.png'
import { observer } from 'mobx-react-lite'
import applicationStore from 'stores/applicationStore'
import { useLocation, useRouteMatch } from 'react-router'

const NavBar = observer(() => {
  let isLoggedin = 'loggedin'
  let userName = 'userName'
  // const route = useRouter()
  // const { path } = route
  const { pathname } = useLocation()
  //console.log('ที่นี่คือ NavBar2')
  //const currentPage = 'Hello W' as any
  const currentPage = pathname
  const navDropdownTitle = (
    <div style={{ color: '#02353C' }}>
      <img
        src={user_icon}
        className="mr-1"
        width="auto"
        height="20px"
        alt="userIcon"
      />
      {userName}
    </div>
  )
  return (
    <Navbar sticky="top" bg="light" expand="lg">
      <Container className="py-2 d-flex">
        <Navbar.Brand href="/">
          <img
            src={logo}
            className="pl-md-5 ml-lg-3"
            width="auto"
            height="40px"
            alt="logo"
          />
        </Navbar.Brand>
        {isLoggedin === 'loggedin' ? (
          <div>
            <Navbar.Toggle aria-controls="basic-navbar-nav align-middle" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link
                  href="/"
                  style={{
                    fontWeight: currentPage === '/' ? 'bold' : 'normal',
                    color: currentPage === '/' ? '#2EAF7D' : '#02353C',
                  }}
                >
                  BROWSE
                </Nav.Link>
                <Nav.Link
                  href="/create-post"
                  style={{
                    fontWeight:
                      currentPage === '/create-post' ? 'bold' : 'normal',
                    color:
                      currentPage === '/create-post' ? '#2EAF7D' : '#02353C',
                  }}
                >
                  CREATE POST
                </Nav.Link>
                <NavDropdown title={navDropdownTitle} id="basic-nav-dropdown">
                  <NavDropdown.Item
                    href="edit-profile"
                    style={{
                      fontWeight:
                        currentPage === '/edit-profile' ? 'bold' : 'normal',
                      color:
                        currentPage === '/edit-profile' ? '#2EAF7D' : '#02353C',
                    }}
                  >
                    EDIT PROFILE
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#">LOG OUT</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </div>
        ) : (
          <div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav activeKey={pathname}>
                <Nav.Link href="/signin">SIGN IN</Nav.Link>
                <Nav.Link
                  style={{ border: '0.1px solid', borderRadius: '5px' }}
                  href="/signup"
                >
                  SIGN UP
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        )}
      </Container>
    </Navbar>
  )
})
export default NavBar
