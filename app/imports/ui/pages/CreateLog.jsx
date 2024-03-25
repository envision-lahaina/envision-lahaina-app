import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { AutoForm, TextField, LongTextField, SubmitField, ErrorsField, HiddenField, NumField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { WorkoutLogs } from '../../api/workoutlog/workoutlog';
import FileField from '../components/FileField';
import { ComponentIDs, PageIDs } from '../utilities/ids';

const bridge = new SimpleSchema2Bridge(WorkoutLogs.schema);

const CreateLog = () => {
  const [imageFile, setImageFile] = useState(null);
  let fRef = null;
  const user = Meteor.user();

  const handleImageChange = (file) => {
    setImageFile(file);
  };

  const submit = (data) => {
    const { image, ...logContent } = data;
    const hours = parseInt(data.activityDurationHours, 10);
    const minutes = parseInt(data.activityDurationMinutes, 10);

    if (Number.isNaN(hours) || Number.isNaN(minutes) || hours < 0 || hours > 24 || minutes < 0 || minutes > 59) {
      swal('Error', 'Please enter a valid input for hours and minutes.', 'error');
      return;
    }

    logContent.createdAt = new Date();
    logContent.owner = user ? user.username : 'Anonymous';

    // Insert post function
    // eslint-disable-next-line no-shadow
    const insertLog = (data) => {
      WorkoutLogs.collection.insert(data, (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Workout Log added successfully', 'success').then(() => {
            window.location.href = '/workoutlog';
          });
          if (fRef) {
            fRef.reset();
          }
        }
      });
    };

    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = function () {
        const fileData = reader.result;

        Meteor.call('uploadImage', fileData, (error2, imageUrl) => {
          if (error2) {
            swal('Error', 'Failed to upload image.', 'error');
          } else {
            logContent.image = imageUrl;
            insertLog(logContent);
          }
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      insertLog(logContent);
    }

    // Meteor.call('textCheck', postData.title, (error) => {
    //   if (error) {
    //     console.error(error);
    //     swal('Error', 'Inappropriate Content in Title', 'error');
    //     return;
    //   }
    //   Meteor.call('textCheck', postData.contents, (error1) => {
    //     if (error1) {
    //       swal('Error', 'Inappropriate Content in Post', 'error');
    //       return;
    //     }
    //     if (imageFile) {
    //       const reader = new FileReader();
    //       reader.onloadend = function () {
    //         const fileData = reader.result;

    //         Meteor.call('uploadImage', fileData, (error2, imageUrl) => {
    //           if (error2) {
    //             swal('Error', 'Failed to upload image.', 'error');
    //           } else {
    //             postData.image = imageUrl;
    //             insertPost(postData);
    //           }
    //         });
    //       };
    //       reader.readAsDataURL(imageFile);
    //     } else {
    //       insertPost(postData);
    //     }
    //   });
    // });
  };

  return (
    <div id={PageIDs.addPost}>
      <Container className="py-3">
        <Row className="justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <Col xs={5}>
            <Col className="text-center"><h2>Create Log</h2></Col>
            <AutoForm ref={(ref) => { fRef = ref; }} schema={bridge} onSubmit={submit}>
              <Card style={{ backgroundColor: 'white', border: 'none' }}>
                <Card.Body>
                  <TextField id={ComponentIDs.addPostTitle} inputClassName="border-dark" name="title" />
                  <div className="mb-3">
                    <FileField name="image" onChange={handleImageChange} />
                  </div>
                  <LongTextField id={ComponentIDs.createLogDescription} inputClassName="border-dark" name="description" />
                  <NumField id={ComponentIDs.addPostActivityDurationHours} name="activityDurationHours" label="Hours Spent" min={0} max={24} />
                  <NumField id={ComponentIDs.addPostActivityDurationMinutes} name="activityDurationMinutes" label="Minutes Spent" min={0} max={59} />
                  <ErrorsField />
                  <SubmitField id={ComponentIDs.addPostSubmit} inputClassName="p-2 bg-white border-1 rounded-1 mt-1" value="Submit" />
                  <HiddenField name="createdAt" value={new Date()} />
                  {user ? <HiddenField name="owner" value={user.username} /> : null}
                </Card.Body>
              </Card>
            </AutoForm>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreateLog;
