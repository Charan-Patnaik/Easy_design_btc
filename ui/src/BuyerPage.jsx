import React, { useState } from 'react';
import { Button, Container, Row, Col, Image, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageList from './ImageList';
import ProfileHeader from './ProfileHeader';
import CreateJob from './CreateJob';

export default function BuyerPage(){
  return(
    <div>
      <ProfileHeader />
      <ImageList />
      <CreateJob />
    </div>
  );
}