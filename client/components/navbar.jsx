import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

export default function AppNav(props) {
  return (
 <Navbar variant="dark" className="pri-color">
    <Container>
    <Navbar.Brand className='head-text' href="#">Home</Navbar.Brand>
    <Nav className="me-auto">
      <NavDropdown title="My Canvas">
        <NavDropdown.Item className="nav-drop" href="#myCanvas">My Canvas Pins</NavDropdown.Item>
        <NavDropdown.Item className="nav-drop" href="#mySavedPins">My Saved Pins</NavDropdown.Item>
      </NavDropdown>
      <Nav.Link href="#artFinder">Art Finder</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
  );
}
