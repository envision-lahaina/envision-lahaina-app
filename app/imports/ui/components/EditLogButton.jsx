import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const EditLog = ({ logId }) => (
  <div>
    <Container className="pb-3">
      <Row className="justify-content-lg-start">
        <Col>
          <button type="button" className="btn btn-secondary"><Link to={`/editlog/${logId}`} style={{ color: 'white', textDecoration: 'none' }}>Edit Log</Link></button>
        </Col>
      </Row>
    </Container>
  </div>
);

EditLog.propTypes = {
  logId: PropTypes.string.isRequired,
};

export default EditLog;
