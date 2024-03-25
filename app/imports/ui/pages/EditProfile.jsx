import React, { useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useTracker } from 'meteor/react-meteor-data';
import { Profiles } from '../../api/profile/profile';
import FileField from '../components/FileField';
import { ComponentIDs, PageIDs } from '../utilities/ids';

const bridge = new SimpleSchema2Bridge(Profiles.schema);

const EditProfile = () => {
  const [imageFile, setImageFile] = useState(null);
  let fRef = null;

  const handleImageChange = (file) => {
    setImageFile(file);
  };

  const profile = Profiles.collection.findOne({ owner: Meteor.user()?.username });
  const _id = profile?._id;

  const { doc, ready } = useTracker(() => {
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    const rdy = subscription.ready();
    const document = Profiles.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);

  const submit = (data) => {
    const { firstName, lastName, location, bio } = data;
    const profileData = { firstName, lastName, location, bio };
    // eslint-disable-next-line no-shadow
    const updateProfile = (profileData) => {
      Profiles.collection.update(_id, { $set: profileData }, (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Profile updated successfully', 'success');
          fRef.reset();
        }
      });
    };
    Meteor.call('textCheck', bio, (error) => {
      if (error) {
        console.error(error);
        swal('Error', 'Inappropriate Content in Bio', 'error');
        return;
      }
      if (imageFile) {
        const reader = new FileReader();
        reader.onloadend = function () {
          const fileData = reader.result;

          Meteor.call('uploadImage', fileData, (err, imageUrl) => {
            if (err) {
              console.error('Image upload error:', err);
              swal('Error', 'Failed to upload image.', 'error');
            } else {
              profileData.image = imageUrl;
              updateProfile(profileData);
            }
          });
        };
        reader.readAsDataURL(imageFile);
      } else {
        updateProfile(profileData);
      }
    });
  };

  const deleteProfile = () => {
    swal({
      title: 'Profile Delete',
      text: 'Once deleted, you will not be able to recover this profile!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          Profiles.collection.remove(_id, (error) => (error ?
            swal('Error', error.message, 'error') :
            swal('Success', 'Profile deleted successfully', 'success')));
        }
      });
  };

  return (
    <div id={PageIDs.editProfile}>
      <Container className="py-3">
        {ready ? (
          <Row className="justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Col xs={5}>
              <Col className="text-center"><h2>Edit Profile</h2></Col>
              <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)} model={doc}>
                <Card style={{ backgroundColor: 'white', border: 'none' }}>
                  <Card.Body>
                    <TextField id={ComponentIDs.editFirstName} inputClassName="border-dark" name="firstName" />
                    <TextField id={ComponentIDs.editLastName} inputClassName="border-dark" name="lastName" />
                    <TextField id={ComponentIDs.editLocation} inputClassName="border-dark" name="location" />
                    <div className="mb-3">
                      <FileField name="image" onChange={handleImageChange} />
                    </div>
                    <LongTextField id={ComponentIDs.editBio} inputClassName="border-dark" name="bio" />
                    <ErrorsField />
                    <SubmitField id={ComponentIDs.submitEdit} value="Submit" inputClassName="p-2 bg-white border-1 rounded-1 mt-1" />
                    <HiddenField name="owner" value={Meteor.user()?.username} />
                  </Card.Body>
                </Card>
              </AutoForm>
              <div className="mt-2 text-center">
                <Button variant="danger" onClick={deleteProfile}>Delete Profile</Button>
              </div>
            </Col>
          </Row>
        ) : (
          <p>Loading...</p>
        )}
      </Container>
    </div>
  );
};

export default EditProfile;
