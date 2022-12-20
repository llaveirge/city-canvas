import React from 'react';
import { Container, Row } from 'react-bootstrap';

export default function NetworkErrorPage(props) {
  return (
        <Container>

          <Row className='text-center'>
            <h2 className='pri-color display-3 fw-bold mt-5'>
              Network Connection Error
            </h2>
          </Row>
          <Row className='text-center'>
            <p className='msg-font lh-base fw-bold pt-4 px-4'>
            Sorry, there was an error connecting to the network.<br />
            Please check your internet connection and try again.
            </p>
          </Row>

        </Container>
  );
}
