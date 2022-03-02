import React from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import PostCard from '../components/card';

export default class MyCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: [],
      user: { profileUrl: 'https://i.redd.it/gikb0vjg40651.jpg' }
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
    const userProfileUrl = this.state.user.profileUrl; // may need to move this to app to access state

    return (
    <>
      <Container fluid className='pri-bk-color my-4 py-3'>
        <Row>
          <Col></Col>
          <Col xs={10} md={8} className='d-grid'>
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
          <Col className='justify-content-center'>
            {pins.length
              ? pins.map(pin => (
                <PostCard
                  key={pin.postId}
                  title={pin.title}
                  artPhotoUrl={pin.artPhotoUrl}
                  profileUrl={userProfileUrl}
                  artistName={pin.artistName}
                  button='Update'
                  href=''
                />
              ))
              : <h5 className='pri-color text-center font-weight-bold'>Nothing to see here...<br/>Get out and start pinning some street art!</h5>}
          </Col>
        </Row>
      </Container>
    </>
    );
  }
}
