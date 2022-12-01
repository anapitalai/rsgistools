import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown,Image } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand><Image className='logo' src='/geocow_logo.png' roundedCircle />GEOCOW</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            {/* <Route render={({ history }) => <SearchBox history={history} />} /> */}
            <Nav className='ml-auto'>
              <LinkContainer to='/admin/map'>
                <Nav.Link>
                  <i className='fas fa-map'></i> CORAL BLEACHING MAP
                </Nav.Link>
              </LinkContainer>

            
                <NavDropdown title='Coral & Bleaching Info' id='adminmenu'>
                  <LinkContainer to='/marine'>
                    <NavDropdown.Item>CORAL & MARINE LIFE</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/coral'>
                    <NavDropdown.Item>CORAL BLEACHING</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/NOAA'>
                    <NavDropdown.Item>NOAA CORAL REEF WATCH</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/field'>
                    <NavDropdown.Item>FIELD OBSERVATIONS</NavDropdown.Item>
                  </LinkContainer>


                </NavDropdown>
            

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>PROFILE</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    LOGOUT
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> SIGN IN
                  </Nav.Link>
                </LinkContainer>
              )}
              
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>USERS</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>BLEACHING SITE</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/coralarealist'>
                    <NavDropdown.Item>BLEACH BLEACHING DATA</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/temperaturelist'>
                    <NavDropdown.Item>TEMPERATURE</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
