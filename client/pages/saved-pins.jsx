import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import PostCard from '../components/card';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';
import LoadingSpinner from '../components/loading-spinner';

export default class SavedPins extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: [],
      isLoading: false,
      networkError: false
    };
  }

  componentDidMount() {
    const { user } = this.context;
    if (user) {
      this.setState({ isLoading: true });
      fetch(`/api/saved-pins/${user.userId}`)
        .then(response => response.json())
        .then(pins => {
          this.setState({ pins, isLoading: false });
        })
        .catch(err => {
          console.error('Fetch Failed!', err);
          this.setState({ networkError: true, isLoading: false });
        });
    }
  }

  render() {
    const { pins, isLoading, networkError } = this.state;
    const { user } = this.context;

    if (!user) return <Redirect to='registration' />;

    if (networkError) {
      return (
        <h6 className='pt-5 px-5 saved-canvas-empty-heading pri-color text-center fw-bold'>
          Sorry, there was an error connecting to the network!
          Please check your internet connection and try again.
        </h6>
      );
    }

    return (
      <Container className='feed-cont'>
          <h3 className='head-text pri-color mt-3 py-3'>My Saved City Canvas</h3>
        <Row className='pt-2'>
          <Col>
            { isLoading
              ? <LoadingSpinner />
              : pins.length
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
                : <h6 className='saved-canvas-empty-heading pri-color text-center fw-bold'>
                    Nothing to see here...
                    <br/>Browse the <a className='sec-color no-decoration' href='#'>
                      City Canvas Home feed</a> and save your favorite pins!
                  </h6>
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

SavedPins.contextType = AppContext;
