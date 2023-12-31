import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { PencilSquare, BoxArrowRight, PersonFill, PersonPlusFill, PlusSquare } from 'react-bootstrap-icons';
import { ComponentIDs } from '../utilities/ids';

const NavBar = () => {
  const { currentUser, loggedIn } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
    loggedIn: !!Meteor.user(),
  }), []);
  const menuStyle = { marginBottom: '0px' };
  const navbarClassName = loggedIn ? 'bg-black' : 'bg-black';
  return (
    <Navbar expand="lg" style={menuStyle} className={navbarClassName}>
      <Container className="m-2 py-0">
        <Navbar.Brand as={NavLink} to="/" className="align-items-center">
          <span style={{ fontWeight: 'bold', fontSize: '32px', color: 'white', fontFamily: 'Sarina' }}>Envision Lahaina </span>
        </Navbar.Brand>
        <Navbar.Toggle id={ComponentIDs.navBar} />
        <Navbar.Collapse id={ComponentIDs.navBar}>
          <Nav className="me-auto">
            {currentUser ? (
              <NavDropdown id={ComponentIDs.navBarCivicEngagementItem} title="Civic Engagement" style={{ marginRight: '1em' }} className="white-text-dropdown">
                <NavDropdown.Item as={NavLink} to="/forum">
                  <Nav.Link id={ComponentIDs.navBarToForum} as={NavLink} to="/forum" key="forum" style={{ color: 'black' }}>Forum</Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/survey">
                  <Nav.Link id={ComponentIDs.navBarToSurvey} as={NavLink} to="/survey" key="survey" style={{ color: 'black' }}>Survey</Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/community">
                  <Nav.Link id={ComponentIDs.navBarToCommunity} as={NavLink} to="/community" key="community" style={{ color: 'black' }}>Community</Nav.Link>
                </NavDropdown.Item>
              </NavDropdown>
            ) : ''}
            {currentUser ? (
              <NavDropdown id={ComponentIDs.navBarVisualizeToolsetItem} title="Visualize Toolset" className="white-text-dropdown">
                <NavDropdown.Item as={NavLink} to="/model">
                  <Nav.Link id={ComponentIDs.navBarToModel} as={NavLink} to="/model" key="model" style={{ color: 'black' }}>Model</Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/dalle3">
                  <Nav.Link id={ComponentIDs.navBarToDalle3} as={NavLink} to="/dalle3" key="dalle" style={{ color: 'black' }}>Dall-E3</Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/mapping">
                  <Nav.Link id={ComponentIDs.navBarToMapping} as={NavLink} to="/mapping" key="gis" style={{ color: 'black' }}>Gis-Map</Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/external">
                  <Nav.Link id={ComponentIDs.navBarToExternal} as={NavLink} to="/external" key="external" style={{ color: 'black' }}>External</Nav.Link>
                </NavDropdown.Item>
              </NavDropdown>
            ) : ''}
          </Nav>

          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id={ComponentIDs.loginDropDown} title="Login" className="mx-1 white-text-dropdown">
                <NavDropdown.Item id={ComponentIDs.navBarSignIn} as={NavLink} to="/signin">
                  <PersonFill />
                  Sign
                  in
                </NavDropdown.Item>
                <NavDropdown.Item id={ComponentIDs.navBarSignUp} as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Sign
                  up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id={ComponentIDs.currentUserDropDown} title={currentUser} className="mx-1 white-text-dropdown">
                <NavDropdown.Item id={ComponentIDs.navBarAddProfile} as={NavLink} to="/addprofile">
                  <PlusSquare />
                  {' '}
                  Add
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item id={ComponentIDs.navBarEditProfile} as={NavLink} to="/editprofile">
                  <PencilSquare />
                  {' '}
                  Edit
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item id={ComponentIDs.navBarSignOut} as={NavLink} to="/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign
                  out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
