import React from 'react';
// import { Container, Row } from 'react-bootstrap';
import RegistrationForm from '../components/registration-form';

export default class Registration extends React.Component {
  render() {
    return (
      <>
      <div className='pg-registration'>
        {/* <Container className='cont-registration pt-5 py-sm-0'> */}
          {/* <Row className='bg-white'> */}
              {/* <h1 className='head-text pri-color pt-3 pt-sm-5 text-center'>
                Create an Account
              </h1> */}
          {/* </Row> */}
        {/* </Container> */}
          <RegistrationForm />
      </div>
      </>
    );
  }
}
