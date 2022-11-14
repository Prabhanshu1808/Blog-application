import React, { useContext, useEffect, useState } from 'react'
import {
  Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { NavLink as ReactLink, useNavigate } from 'react-router-dom';
import {  doLogout, getCurrentUserDetail, isLoggedIn } from '../auth';
import userContext from '../context/userContext';

const Header = () => {
  const userContextData = useContext(userContext)
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    setLogin(isLoggedIn());
    setUser(getCurrentUserDetail());

  }, [login])

  const logout = () => {
    doLogout(() => {
      //logged out
      setLogin(false)
      navigate("/")
    })
  }


  return (
    <div style={{ backgroundColor: "lightblue" }}>
      <Navbar expand='md' fixed='' className='px-4'>
        <NavbarBrand tag={ReactLink} to="/">BLog</NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/">New Feed</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/about"> About </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/service"> Services </NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav>

            {
              login && (
                <>

                   <NavItem>
                    <NavLink tag={ReactLink} to="/user/profile"> Profile </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink tag={ReactLink} to="/user/dashboard"> {user.name} </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink onClick={logout} style={{cursor:"pointer"}}> Logout </NavLink>
                  </NavItem>
                </>
              )

            }

            {
              !login && (

                <>
                  <NavItem>
                    <NavLink tag={ReactLink} to="/login"> Login </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={ReactLink} to="/register"> Signup </NavLink>
                  </NavItem>
                </>
              )
            }
          </Nav>
        </Collapse>
      </Navbar>

    </div>
  )
}

export default Header

