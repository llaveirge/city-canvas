import React from 'react';
import { Container, Row } from 'react-bootstrap';

export default function NotFound(props) {
  return (
    <Container>
      <Row className='text-center'>
        <h2 className='pri-color display-3 fw-bold mt-5'>404</h2>
      </Row>
      <Row className='text-center'>
          <p className='pt-4 fw-bold'>
            We can&apos;t seem to find the page you&apos;re looking for...
            <br />
            <a href='#' className='pri-color'>
              Return to the City Canvas home page
            </a>
          </p>
      </Row>
    </Container>
  );
}
