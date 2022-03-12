import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

export default class SavedPins extends React.Component {

  render() {
    return (
      <Container className='feed-cont'>
          <h3 className='head-text pri-color mt-3 py-3'>My Saved City Canvas</h3>
        <Row className='pt-2'>
          <Col className='justify-content-center'>
          </Col>
        </Row>
      </Container>
    );
  }
}
