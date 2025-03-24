import React from "react";
import { Nav, Navbar, Container, NavLink, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../actions/userActions";
import { Link } from "react-router-dom";
const Header = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const logoutHandler=()=>{
    dispatch(logOut())
    
  }


 

   return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">
            <strong>EventLoop</strong>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/*Category Component links*/}
              <NavLink href="/category/Technology">Technology</NavLink>
              <NavLink href="/category/Art">Art</NavLink>
              <NavLink href="/category/Music & Dance">Music & Dance</NavLink>
              <NavLink href="/category/Food & Drink">Food & Drink</NavLink>
            </Nav>
            <Nav className="ms-auto">
              <NavLink href="/cart">
                <i class="fa-solid fa-ticket-simple"></i> Tickets
              </NavLink>
              {userInfo ? (
                <NavDropdown title={userInfo.name}>
                  <NavDropdown.Item as={Link} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    LogOut
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavLink href="/login">
                  <i class="fa-solid fa-user"></i> Login/SignUp
                </NavLink>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
