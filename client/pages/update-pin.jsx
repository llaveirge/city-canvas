import React from 'react';
import UpdatePinForm from '../components/update-pin-form';

import { Container } from 'react-bootstrap';

export default class UpdatePin extends React.Component {
  render() {
    return (
      <>
        <Container>
          <h3 className='head-text pri-color py-2 mt-4 text-center'>
            Update City Canvas Pin
          </h3>
          <UpdatePinForm postId={+this.props.postId}/>
        </Container>
      </>
    );
  }
}
