import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Image } from 'react-bootstrap';

const ProfileHeader = () => {
  // Example profile data
  const profile = {
    name: 'John Doe',
    profileImageUrl: 'https://via.placeholder.com/150', // Example URL for profile image
  };

  const handleSignOut = () => {
    // Your signout logic here
    console.log('Sign out clicked');
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        <Image src={profile.profileImageUrl} roundedCircle style={{ width: '40px', marginRight: '10px' }} />
        {profile.name}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
            <div className='float-end'>
                <Nav.Link onClick={handleSignOut} className="ml-auto">Sign Out</Nav.Link>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default ProfileHeader;