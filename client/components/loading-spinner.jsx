import React from 'react';
import { Container, Row } from 'react-bootstrap';

export default function LoadingSpinner(props) {
  return (
    <Container>
      <Row className='justify-content-center'>
    <div className='lds-ellipsis absolute'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    </Row>
    </Container>
  );
}
