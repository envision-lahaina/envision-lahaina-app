import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Col, Row, Table, Form, Pagination, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { WorkoutLogs } from '../../api/workoutlog/workoutlog';
import Log from '../components/Log';

const WorkoutLog = () => {
  const logsPerPage = 10;
  const [activePage, setActivePage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMyLogs] = useState(false);

  const { workoutlogs, ready } = useTracker(() => {
    const workoutLogSubscription = Meteor.subscribe(WorkoutLogs.userPublicationName);
    const rdy = workoutLogSubscription.ready();
    const workoutLogItems = WorkoutLogs.collection.find({}).fetch();
    return {
      workoutlogs: workoutLogItems,
      ready: rdy,
    };
  }, []);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  let filteredLogs = workoutlogs.filter(log => log.title.toLowerCase().includes(searchTerm.toLowerCase())
    || log.description.toLowerCase().includes(searchTerm.toLowerCase()));
  console.log(workoutlogs);

  if (viewMyLogs) {
    filteredLogs = filteredLogs.filter(log => log.owner === Meteor.user().username);
  }

  filteredLogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const startIndex = (activePage - 1) * logsPerPage;
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + logsPerPage);
  console.log(paginatedLogs);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredLogs.length / logsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    ready ? (
      <Container>
        <Row>
          <Col xs={12} className="mt-5">
            <Row>
              <Col xs={10}>
                <h2 style={{ fontWeight: 'bold' }} className="p-3">Workout Log</h2>
              </Col>
              <Col xs={2} style={{ alignContent: 'center' }}>
                <Button href="/createlog" variant="success" style={{ width: '100%' }}>Create Log</Button>
              </Col>
            </Row>
            <Form className="mb-3" onSubmit={handleSearchSubmit}>
              <Form.Group controlId="searchBar">
                <Row style={{ margin: 0, padding: '2% 0' }}>
                  <Col xs={12}>
                    <Form.Control type="text" placeholder="Search by Title or Description" value={searchTerm} onChange={handleSearchChange} />
                  </Col>
                </Row>
              </Form.Group>
            </Form>
            <Table hover className="workoutlog-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Duration (hr:m)</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              {paginatedLogs.map((log) => <Log key={log._id} log={log} />)}
            </Table>
            {pageNumbers.length > 1 && (
              <Pagination className="justify-content-center mt-3">
                {pageNumbers.map(number => (
                  <Pagination.Item key={number} active={number === activePage} onClick={() => handlePageChange(number)}>
                    {number}
                  </Pagination.Item>
                ))}
              </Pagination>
            )}
          </Col>
        </Row>
      </Container>
    ) : <LoadingSpinner />
  );
};

export default WorkoutLog;
