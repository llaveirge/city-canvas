import React from 'react';
import AppContext from '../lib/app-context';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

export default class AppNav extends React.Component {

  render() {

    const { user, handleSignOut } = this.context;

    return (
    <Navbar variant='dark' className='pri-bk-color' expand='sm'>

      <Container>
        <Navbar.Brand className='head-text menu' href='#'>Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="options-navbar-nav" />
          <Navbar.Collapse id="options-navbar-nav">
            <Nav className='me-auto'>
              <NavDropdown title='My Canvas'>
                <NavDropdown.Item className='nav-drop' href='#my-canvas'>
                  My Canvas Pins
                </NavDropdown.Item>
                <NavDropdown.Item className='nav-drop' href='#my-saved-pins'>
                  My Saved Pins
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href='#art-finder'>Art Finder</Nav.Link>
                { user
                  ? <Nav.Link href='' onClick={ handleSignOut }>
                      Sign Out
                    </Nav.Link>
                  : null
                  }
            </Nav>
          </Navbar.Collapse>
      </Container>

    </Navbar>
    );
  }
}

AppNav.contextType = AppContext;
