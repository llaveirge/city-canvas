import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import PostCard from '../components/card';
import { AppContext } from '../lib';
import Redirect from '../components/redirect';
import InternalErrorPage from './internal-error';
import NetworkErrorPage from './network-error';
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
        .then(res => {
          if (res.ok) {
            res.json().then(pins => {
              this.setState({ pins, isLoading: false });
            });
          } else {
            res.json().then(response => {
              console.error(response.error);
              if (response.error.includes('userId')) {
                this.setState({ userIdError: true, isLoading: false });
              } else {
                this.setState({ internalError: true, isLoading: false });
              }
            });
          }
        })
        .catch(err => {
          console.error('Fetch Failed!', err);
          this.setState({ networkError: true, isLoading: false });
        });
    }
  }

  render() {
    const { pins, isLoading, networkError, internalError, userIdError } = this.state;
    const { user } = this.context;

    if (!user) return <Redirect to='registration' />;
    if (networkError) return <NetworkErrorPage />;
    if (internalError) return <InternalErrorPage />;

    if (userIdError) {
      return (
        <Container>
        <Row className='text-center'>
          <h2 className='mt-5 display-3 pri-color fw-bold'>User Account Error</h2>
        </Row>
        <Row className='text-center'>
          <p className='pt-4 px-4 fw-bold error-text no-results-heading'>
            An account error has occurred. Please sign out and sign in again, or <a href='#registration' className='sec-color no-decoration'>create an account</a>.
            <br />
            <br />
            <a href='#registration' className='sec-color fw-bold no-decoration'>
              Return to the City Canvas Registration Page
            </a>
          </p>
        </Row>
      </Container>
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
                : <h6 className='no-results-heading pri-color text-center fw-bold error-text'>
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
