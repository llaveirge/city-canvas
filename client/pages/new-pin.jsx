import React from 'react';
import NewPinForm from '../components/new-pin-form';
import { Container } from 'react-bootstrap';

export default class NewPin extends React.Component {
  render() {
    return (
      <>
        <Container>
          <h3 className='head-text pri-color py-2 mt-4 text-center'>New City Canvas Pin</h3>
          <NewPinForm />
        </Container>

      </>
    );
  }

}
