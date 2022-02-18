import React from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import PostCard from '../components/card';

export default class MyCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: [1]
    };
  }

  render() {
    const pins = this.state.pins;
    return (
    <>
      <Container fluid className="pri-bk-color my-4 py-3">
        <Row>
          <Col></Col>
          <Col xs={10} md={8} className="d-grid">
        <Button size ="lg">
          Create a City Canvas Pin
        </Button>
        </Col>
        <Col></Col>
        </Row>
      </Container>
      <Container>
      <h3 className='head-text pri-color py-2'>My City Canvas</h3>
      <Row className='pt-2'>
        <Col className='d-flex justify-content-center'>
          {pins.length ? <PostCard /> : <h5 className="pri-color text-center">Nothing to see here...<br/>Get out and start pinning some street art!</h5>}
        </Col>
      </Row>
      </Container>
    </>
    );
  }
}
