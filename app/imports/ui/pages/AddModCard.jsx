import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { AutoForm, TextField, LongTextField, SubmitField, ErrorsField, HiddenField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { ModCards } from '../../api/modcard/modcard';
import FileField from '../components/FileField';
import { ComponentIDs, PageIDs } from '../utilities/ids';

const bridge = new SimpleSchema2Bridge(ModCards.schema);

const AddModCard = () => {
  const [imageFile, setImageFile] = useState(null);
  let fRef = null;
  const user = Meteor.user();

  const location = useLocation();
  const currentAddress = location.state?.formattedAddress || '';

  const handleImageChange = (file) => {
    setImageFile(file);
  };

  const submit = (data) => {
    const { image, ...modCardData } = data;
    modCardData.address = currentAddress;
    // eslint-disable-next-line no-shadow
    const insertModCard = (modCardData) => {
      ModCards.collection.insert(modCardData, (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'ModCard added successfully', 'success');
          if (fRef) {
            fRef.reset();
          }
        }
      });
    };
    Meteor.call('textCheck', modCardData.detail, (error) => {
      if (error) {
        console.error(error);
        swal('Error', 'Inappropriate Content in Detail', 'error');
        return;
      }
      if (imageFile) {
        const reader = new FileReader();
        reader.onloadend = function () {
          const fileData = reader.result;

          Meteor.call('uploadImage', fileData, (err, imageUrl) => {
            if (err) {
              swal('Error', 'Failed to upload image.', 'error');
            } else {
              modCardData.image = imageUrl;
              insertModCard(modCardData);
            }
          });
        };
        reader.readAsDataURL(imageFile);
      } else {
        insertModCard(modCardData);
      }
    });
  };

  return (
    <div id={PageIDs.addModCard}>
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col xs={6}>
            <Col className="text-center"><h2>Add ModCard</h2></Col>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={submit}>
              <Card>
                <Card.Body>
                  <TextField id={ComponentIDs.addModType} name="type" />
                  <div className="mb-3">
                    <FileField name="image" onChange={handleImageChange} />
                  </div>
                  <TextField id={ComponentIDs.addModCost} name="cost" />
                  <LongTextField id={ComponentIDs.addModDetail} name="detail" />
                  <ErrorsField />
                  <SubmitField id={ComponentIDs.addModSubmit} value="Submit" />
                  <HiddenField name="createdAt" value={new Date()} />
                  <HiddenField name="address" value={currentAddress} />
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

export default AddModCard;
