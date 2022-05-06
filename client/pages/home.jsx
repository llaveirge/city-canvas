import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import PostCard from '../components/card';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: []
    };
  }

  componentDidMount() {
    const { user } = this.context;
    if (user) {
      fetch('/api/home-feed')
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
      <Container className='feed-cont'>
        <Row className='pt-5'>
          <Col>
            {pins.map(pin => (
              <PostCard
              key={ pin.postId }
              title={ pin.title }
              artPhotoUrl={ pin.artPhotoUrl }
              profileUrl={ pin.photoUrl }
              artistName={ pin.artistName }
              button='View More'
              href={ `#pins?postId=${pin.postId}` }
              saver={ pin.saver }
              userId={ user.userId }
              reported={ pin.reported }
              />
            ))}
          </Col>
        </Row>
      </Container>
    );
  }
}

Home.contextType = AppContext;
