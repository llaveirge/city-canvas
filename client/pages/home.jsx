import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import PostCard from '../components/card';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: []
    };
  }

  componentDidMount() {
    fetch('/api/home-feed')
      .then(response => response.json())
      .then(pins => {
        this.setState({ pins });
      });
  }

  render() {
    const { pins } = this.state;

    return (
      <Container className='feed-cont'>
        <Row className='pt-5'>
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
              />
            ))}
          </Col>
        </Row>
      </Container>
    );
  }

}
