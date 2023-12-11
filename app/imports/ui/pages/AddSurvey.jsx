import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Surveys } from '../../api/survey/survey';

const bridge = new SimpleSchema2Bridge(Surveys.schema);

const AddSurvey = () => {
  const submit = (data, formRef) => {
    const { contents, createdAt, option1, option2, owner } = data;
    const subscription = Meteor.subscribe(Surveys.userPublicationName);
    // eslint-disable-next-line no-unused-vars
    const rdy = subscription.ready();
    const currentDate = new Date();
    const ownerSurveys = Surveys.collection.find({ owner: Meteor.user().username, createdAt: currentDate }).fetch();
    const insertSurvey = () => {
      if (ownerSurveys.length() >= 1) {
        swal('You can only post one survey per day');
      } else {
        Surveys.collection.insert({ contents, createdAt, option1, option2, owner }, (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Survey added successfully', 'success');
            formRef.reset();
          }
        });
      }
    };
    Meteor.call('textCheck', contents, (errorContents) => {
      if (errorContents) {
        swal('Error', 'Inappropriate Content in Survey Contents', 'error');
        return;
      }
      Meteor.call('textCheck', option1, (error1) => {
        if (error1) {
          swal('Error', 'Inappropriate Content in Option 1', 'error');
          return;
        }
        Meteor.call('textCheck', option2, (error2) => {
          if (error2) {
            swal('Error', 'Inappropriate Content in Option 2', 'error');
            return;
          }
          // If all text checks pass, insert the survey
          insertSurvey();
        });
      });
    });
  };

  let fRef = null;
  const user = Meteor.user();

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={6}>
          <Col className="text-center"><h2>Add Survey</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <LongTextField name="contents" />
                <HiddenField name="createdAt" value={new Date()} />
                <TextField name="option1" />
                <TextField name="option2" />
                <ErrorsField />
                <SubmitField value="Submit" />
                {user ? <HiddenField name="owner" value={user.username} /> : null}
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddSurvey;
