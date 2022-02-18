import React from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import PostCard from '../components/card';

export default class MyCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: []
    };
  }

  componentDidMount() {
    fetch('/api/my-canvas-pins')
      .then(response => response.json())
      .then(pins => {
        this.setState({ pins });
      });
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
        <Col className='justify-content-center'>
          {pins.length
            ? <><PostCard
            title="Cool Art Thing"
            artPhotoUrl='https://images.fineartamerica.com/images-medium-large-5/colorado-springs-mural-allen-beatty.jpg'
            profileUrl='https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
            artistName='That One Guy'
            />
            <PostCard
            title="Another Cool Art Thing"
            artPhotoUrl='https://bloximages.newyork1.vip.townnews.com/gazette.com/content/tncms/assets/v3/editorial/1/11/111fbde2-a061-11ea-ad32-bfb117588960/5ecedbafd9e1f.image.jpg?crop=1637%2C1228%2C0%2C19&resize=1637%2C1228&order=crop%2Cresize'
            profileUrl='https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
            artistName='That One Guy'
            /></>
            : <h5 className="pri-color text-center">Nothing to see here...<br/>Get out and start pinning some street art!</h5>}
        </Col>
      </Row>
      </Container>
    </>
    );
  }
}
