import React from 'react'
import { Nav,Navbar,Container,NavLink } from 'react-bootstrap'

const Header = () => {
  return (
   <>
   <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/"><strong>EventLoop</strong></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
           {/*Category Component links*/}
            <NavLink href="/category/Technology">Technology</NavLink>
            <NavLink href="/category/Art">Art</NavLink>
            <NavLink href='/category/Music & Dance'>Music & Dance</NavLink>
            <NavLink href='/category/Food & Drink'>Food & Drink</NavLink>

          </Nav>
          <Nav className='ms-auto'>
            <NavLink><i class="fa-solid fa-ticket-simple"></i> Tickets</NavLink>
            <NavLink><i class="fa-solid fa-user"></i> Login/SignUp</NavLink>


          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
   </>
  )
}

export default Header