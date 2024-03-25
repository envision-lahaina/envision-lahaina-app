import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ComponentIDs } from '../utilities/ids';

const footerStyle = { boxShadow: '0 -4px 6px -1px rgba(0,0,0,0.1), 0 -2px 4px -2px rgba(0,0,0,0.1)' };

const Footer = () => (
  <footer id={ComponentIDs.footer} className="footer mt-auto py-3 footer" style={footerStyle}>
    <Container>
      <Row>
        <Col className="text-center">
          Fit Journey
          {' '}
          <br />
          By John, Tiffany, Loelle, Mai
          <br />
          Email: fitjourney@gmail.com
          {' '}
          <br />
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
