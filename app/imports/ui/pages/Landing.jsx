/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { PageIDs } from '../utilities/ids';

const landingWrapperStyle = { padding: '8% 5%' };

const Landing = () => (
  <div id={PageIDs.landing}>
    <div className="landing-white-background landing-wrapper" style={landingWrapperStyle}>
      <Row md={1} lg={2} className="justify-content-center d-flex">
        <Col xs={4} className="main-logo-wrapper">
          <img src="/images/logo_square.png" alt="Landing Page Logo" />
        </Col>
        <Col xs={8}>
          <h3 style={{ fontSize: '4em', marginTop: '1em', color: 'black', fontWeight: 'bold' }}>
            Welcome to FitJourney
          </h3>
          <p style={{ color: 'black', fontSize: '110%' }}>
            At FitJourney, we believe that every step counts on your path to wellness.
            Our app is designed to empower you, whether you're a seasoned athlete or just starting out on your fitness journey.
            With FitJourney, you can easily track your workouts and monitor your progress
          </p>
        </Col>
      </Row>
    </div>
  </div>
);

export default Landing;
