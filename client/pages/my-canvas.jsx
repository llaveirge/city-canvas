import React from 'react';
import { Container, Button } from 'react-bootstrap';

export default function MyCanvas(props) {
  return (
    <>
      <Container fluid className="d-flex justify-content-center pri-bk-color my-4 py-3">
        <Button size ="md" className="btn-pad-x">
          Create a City Canvas Pin
        </Button>
      </Container>
      <Container>
      <h3 className='head-text pri-color py-2'>My City Canvas</h3>
      </Container>
    </>
  );
}
