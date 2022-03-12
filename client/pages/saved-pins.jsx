import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import PostCard from '../components/card';

export default class SavedPins extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: []
    };
  }

  componentDidMount() {
    fetch('/api/saved-pins')
      .then(response => response.json())
      .then(pins => {
        this.setState({ pins });
      });
  }

  render() {
    const { pins } = this.state;

    return (
      <Container className='feed-cont'>
          <h3 className='head-text pri-color mt-3 py-3'>My Saved City Canvas</h3>
        <Row className='pt-2'>
          <Col className='justify-content-center'>
            {pins.map(pin => (
              <PostCard
              key={ pin.postId }
              title={ pin.title }
              artPhotoUrl={ pin.artPhotoUrl }
              profileUrl={ pin.photoUrl }
              artistName={ pin.artistName }
              button='View More'
              href={`#pins?postId=${pin.postId}`}
              saved={ pin.saved }
              />
            ))}
          </Col>
        </Row>
      </Container>
    );
  }
}
