import React, { useState } from 'react';
import { forwardRef } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

import { useTheme } from './ThemeContext';

const PerfectHashNavbar = forwardRef((props, ref) => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <Navbar ref={ref} expand="lg" bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'}>
      <Container>
        <Navbar.Brand href="#home">Perfect Hash Command Generator</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="https://github.com/tpn/perfecthash-ui">GitHub</Nav.Link>
            <Nav.Link href="https://trent.me">Trent Nelson</Nav.Link>
          </Nav>
          <Button variant={darkMode ? 'outline-light' : 'outline-dark'} onClick={toggleDarkMode}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

export default PerfectHashNavbar;
