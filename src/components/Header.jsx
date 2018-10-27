import React from 'react'
import { Navbar, NavItem } from 'react-materialize/lib/Navbar';

const header = () => {
   return (
      <Navbar brand='logo' left>
         <NavItem href='get-started.html'>Getting started</NavItem>
      </Navbar>
   )
}

export default header
