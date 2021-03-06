import React from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import PostCard from '../components/card';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class MyCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: []
    };
  }

  componentDidMount() {
    const { user } = this.context;
    if (user) {
      fetch(`/api/my-canvas-pins/${user.userId}`)
        .then(response => response.json())
        .then(pins => {
          this.setState({ pins });
        });
    }
  }

  render() {
    const { pins } = this.state;
    const { user } = this.context;

    if (!user) return <Redirect to='registration' />;

    return (
      <>
        <Container fluid className='pri-bk-color my-4 py-3'>
          <Row>
            <Col></Col>
            <Col xs={ 10 } md={ 8 } className='d-grid'>
              <Button href='#new-pin' size ='lg'>
                Create a City Canvas Pin
              </Button>
            </Col>
            <Col></Col>
          </Row>
        </Container>
        <Container className='feed-cont'>
          <h3 className='head-text pri-color py-2'>My City Canvas</h3>
          <Row className='pt-2'>
            <Col>
              { pins.length
                ? pins.map(pin => (
                  <PostCard
                    key={ pin.postId }
                    title={ pin.title }
                    artPhotoUrl={ pin.artPhotoUrl }
                    profileUrl={ user.photoUrl }
                    artistName={ pin.artistName }
                    button='Update'
                    href={ `#update-pin?postId=${pin.postId}` }
                    saved={ pin.saved }
                    reported={ pin.reported }
                  />
                ))
                : <h5 className='pri-color text-center fw-bold'>
                    Nothing to see here...
                    <br/>Get out and start pinning some street art!
                  </h5>}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

MyCanvas.contextType = AppContext;
