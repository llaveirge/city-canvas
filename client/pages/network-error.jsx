import React from 'react';
import { Container, Row } from 'react-bootstrap';

export default function NetworkErrorPage(props) {
  return (
        <Container>

          <Row className='text-center'>
            <h2 className='mt-5 display-3 pri-color fw-bold'>
              Network Connection Error
            </h2>
          </Row>
          <Row className='text-center'>
            <p className='pt-4 px-4 fw-bold error-text'>
            Sorry, there was an error connecting to the network!
            Please check your internet connection and try again.
            </p>
          </Row>

        </Container>
  );
}
