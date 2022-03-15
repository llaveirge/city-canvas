import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

export default function AppNav(props) {
  return (
  <Navbar variant='dark' className='pri-bk-color'>
    <Container>
      <Navbar.Brand className='head-text menu' href='#'>Home</Navbar.Brand>
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
        </Nav>
    </Container>
  </Navbar>
  );
}
