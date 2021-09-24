import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import logo from '../assets/icons/logo.png'
import user_icon from '../assets/icons/user-icon.png'
import { observer } from 'mobx-react-lite'
import applicationStore from 'stores/applicationStore'
import { useLocation, useRouteMatch } from 'react-router'
import { signOut } from 'service/auth'
import { Link } from 'react-router-dom'
import { doc, DocumentData, getDoc } from '@firebase/firestore'
import { get_info } from 'service/system'
import { firestore } from 'config/firebase'

const NavBar = observer(() => {
  const [infoData, setInfoData] = useState<DocumentData>()

  const info_doc = applicationStore.user
    ? doc(firestore, 'Account', applicationStore.user.uid)
    : null

  // useEffect(() => {
  //   if (!applicationStore.user) return
  //   async function fetch() {
  //     const info = (await get_info(applicationStore.user.uid)) as DocumentData
  //     setInfoData(info)
  //   }
  //   fetch()
  // }, [applicationStore, info_doc])
  useEffect(() => {
    if (!applicationStore.user) return
    async function fetch() {
      const info = (await get_info(applicationStore.user.uid)) as DocumentData

      setInfoData(info)
    }
    fetch()
  }, [])

  let isLoggedin = 'loggedin'
  let userName = infoData?.DisplayName ? infoData?.DisplayName : 'userName'
  const { pathname } = useLocation()
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
  const logOut = () => {
    signOut()
  }
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
                  // href="/create-post"
                  style={{
                    fontWeight:
                      currentPage === '/create-post' ? 'bold' : 'normal',
                    color:
                      currentPage === '/create-post' ? '#2EAF7D' : '#02353C',
                  }}
                >
                  <Link to="/create-post"> CREATE POST </Link>
                </Nav.Link>
                <NavDropdown title={navDropdownTitle} id="basic-nav-dropdown">
                  <NavDropdown.Item
                    // href="edit-profile"
                    style={{
                      fontWeight:
                        currentPage === '/edit-profile' ? 'bold' : 'normal',
                      color:
                        currentPage === '/edit-profile' ? '#2EAF7D' : '#02353C',
                    }}
                  >
                    <Link to="/edit-profile"> EDIT PROFILE </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/" onClick={logOut}>
                    LOG OUT
                  </NavDropdown.Item>
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
