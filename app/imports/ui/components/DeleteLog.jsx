import React, { useState } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import { Meteor } from 'meteor/meteor';
import { Row, Col, Button, Modal, Image } from 'react-bootstrap';
import swal from 'sweetalert';
import { WorkoutLogs } from '../../api/workoutlog/workoutlog';
import { ComponentIDs } from '../utilities/ids';

const DeleteLog = ({ logId }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const workoutLog = WorkoutLogs.collection.findOne({ _id: logId });
  console.log(workoutLog);

  // const [imageFile, setImageFile] = useState(null);
  // eslint-disable-next-line no-shadow
  const deleteLog = () => {
    WorkoutLogs.collection.remove({ _id: logId }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Comment DELETED successfully', 'success');
      }
    });
    setShow(false);
  };

  return (
    <div id={ComponentIDs.deleteLog}>
      <Button variant="outline-danger" size="sm" onClick={handleShow}>Delete</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Workout Log</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <span style={{ fontWeight: 'bold' }}>
              Date:&nbsp;
            </span>
            <span>
              {(workoutLog.date instanceof Date ? workoutLog.date : new Date(workoutLog.date)).toLocaleDateString('en-US')}
            </span>
          </div>
          <Row>
            <Col xs={12}><Image src={workoutLog.image} style={{ width: '100%' }} /></Col>
          </Row>
          <div>
            <span style={{ fontWeight: 'bold' }}>
              Title:&nbsp;
            </span>
            <span>
              {workoutLog.title}
            </span>
          </div>
          <div>
            <span style={{ fontWeight: 'bold' }}>
              Description:&nbsp;
            </span>
            <span>
              {workoutLog.description}
            </span>
          </div>
          <div>
            <span style={{ fontWeight: 'bold' }}>
              Duration:&nbsp;
            </span>
            <span>
              {String(workoutLog.activityDurationHours).padStart(2, '0')}:
              {String(workoutLog.activityDurationMinutes).padStart(2, '0')}
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outline-danger" size="sm" onClick={deleteLog}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

DeleteLog.propTypes = {
  logId: PropTypes.string.isRequired,
};

export default DeleteLog;
