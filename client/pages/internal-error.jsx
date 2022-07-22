import React from 'react';
import { Container, Row } from 'react-bootstrap';

export default function InternalErrorPage(props) {
  return (
    <Container>
      <Row className='text-center'>
        <h2 className='mt-5 pri-color display-3 fw-bold'>Oops, we have paint on our face...</h2>
      </Row>
      <Row>
          <p className='pt-5 px-4 fw-bold'>
            Sorry, something&apos;s not right here. Please try the following:
          </p>

            <ul className='pt-2 px-4'>
              <li>
                Refresh the page, this might help.
              </li>
              <li>
                Try signing out and signing back in again.
              </li>
              <li>
                If this problem persists, please contact us at <a
                  href="mailto:citycanvashelpers@gmail.com">
                     CityCanvasHelpers@gmail.com
                  </a>
              </li>
            </ul>
      </Row>
      </Container>
  );
}
