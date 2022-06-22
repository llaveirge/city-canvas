import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import PostCard from '../components/card';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class SavedPins extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: []
    };
  }

  componentDidMount() {
    const { user } = this.context;
    if (user) {
      fetch(`/api/saved-pins/${user.userId}`)
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
          <h3 className='head-text pri-color mt-3 py-3'>My Saved City Canvas</h3>
        <Row className='pt-2'>
          <Col>
            { pins.length
              ? pins.map(pin => (
                <PostCard
                  key={ pin.postId }
                  title={ pin.title }
                  artPhotoUrl={ pin.artPhotoUrl }
                  profileUrl={ pin.photoUrl }
                  artistName={ pin.artistName }
                  button='View More'
                  href={ `#pins?postId=${pin.postId}` }
                  reported={ pin.reported }
                  saver={ pin.saver }
                  userId={ user.userId }
                />
              ))
              : <h5 className='pri-color text-center font-weight-bold'>
                  Nothing to see here...
                  <br/>Browse the <a className='sec-color no-decoration' href='#'>
                    City Canvas Home feed</a> and save your favorite pins!
                </h5>
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

SavedPins.contextType = AppContext;
