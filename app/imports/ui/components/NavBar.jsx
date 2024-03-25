import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { PencilSquare, BoxArrowRight, PersonFill, PersonPlusFill, PlusSquare } from 'react-bootstrap-icons';
import { ComponentIDs } from '../utilities/ids';

const NavBar = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
    loggedIn: !!Meteor.user(),
  }), []);
  const navStyle = { boxShadow: '0 6px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.2)' };

  return (
    <Navbar expand="lg" style={navStyle}>
      <div className="navbar-wrapper">
        <Navbar.Brand as={NavLink} to="/" className="align-items-center">
          <img src="/images/FitJourney_horizontal.png" alt="navbar logo" width="250" />
        </Navbar.Brand>
        <Navbar.Toggle id={ComponentIDs.navBar} />
        <Navbar.Collapse id={ComponentIDs.navBar}>
          <Nav className="me-auto">
            {currentUser ? (
              <NavDropdown id={ComponentIDs.navBarCivicEngagementItem} title="Workout Log" style={{ marginRight: '1em' }}>
                <NavDropdown.Item as={NavLink} to="/workoutlog">
                  <Nav.Link id={ComponentIDs.navBarToWorkoutLog} as={NavLink} to="/workoutlog" key="workoutlog" style={{ color: 'black' }}>Workout Log</Nav.Link>
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
      </div>
    </Navbar>
  );
};

export default NavBar;
