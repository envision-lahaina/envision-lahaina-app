import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import DeleteLog from './DeleteLog';
import EditLog from './EditLog';
// import EditLogButton from './EditLogButton';
// import DeleteLog from './DeleteLog';
// import { ComponentIDs } from '../utilities/ids';

const Log = ({ log }) => (
  <tbody>
    <tr>
      <td>{(log.date instanceof Date ? log.date : new Date(log.date)).toLocaleDateString('en-US')}</td>
      <td><Image src={log.image} width={80} /></td>
      <td>{log.title}</td>
      <td>{log.description}</td>
      <td style={{ fontFamily: 'monospace' }}>
        {String(log.activityDurationHours).padStart(2, '0')}:
        {String(log.activityDurationMinutes).padStart(2, '0')}
      </td>
      <td>
        <EditLog logId={log._id} />
      </td>
      <td>
        <DeleteLog logId={log._id} />
      </td>
    </tr>
  </tbody>
);

Log.propTypes = {
  log: PropTypes.shape({
    date: PropTypes.instanceOf(Date),
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
    owner: PropTypes.string,
    _id: PropTypes.string,
    logId: PropTypes.string,
    activityDurationHours: PropTypes.number,
    activityDurationMinutes: PropTypes.number,
  }).isRequired,
};

export default Log;
