import React from 'react';
import { Container, Row } from 'react-bootstrap';

export default class Registration extends React.Component {
  render() {
    return (
      <>
      <div className='pg-registration'>
        <Container className='cont-registration py-5 py-sm-0'>
          <Row className='bg-white'>
              <h1 className='head-text pri-color py-5 text-center'>
                Create an Account
              </h1>
          </Row>
        </Container>
      </div>
      </>
    );
  }
}
