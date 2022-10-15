import React from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import PostCard from '../components/card';
import { AppContext } from '../lib';
import Redirect from '../components/redirect';
import LoadingSpinner from '../components/loading-spinner';
import InternalErrorPage from './internal-error';
import NetworkErrorPage from './network-error';

export default class MyCanvas extends React.Component {
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
      fetch(`/api/my-canvas-pins/${user.userId}`)
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
    const {
      pins,
      isLoading,
      networkError,
      internalError,
      userIdError
    } = this.state;
    const { user } = this.context;

    if (!user) return <Redirect to='registration' />;
    if (internalError) return <InternalErrorPage />;
    if (networkError) return <NetworkErrorPage />;

    if (userIdError) {
      return (
        <Container>
          <Row className='text-center'>
            <h2 className='pri-color fw-bold display-3 mt-5'>
              User Account Error
            </h2>
          </Row>
          <Row className='text-center'>
            <p className='msg-font err-text fw-bold pt-4 px-4 '>
              An account error has occurred. Please sign out and sign in again,
              or&nbsp;
              <a href='#registration' className='sec-color no-decoration'>
                create an account
              </a>.
              <br />
              <br />
              <a
                href='#registration'
                className='sec-color no-decoration fw-bold'
              >
                Return to the City Canvas Registration Page
              </a>
            </p>
          </Row>
        </Container>
      );
    }

    return (
      <>
        <Container fluid className='pri-bk-color my-4 py-3'>
          <Row>
            <Col
              xs={{ span: 10, offset: 1 }}
              md={{ span: 8, offset: 2 }}
              className='d-grid'
            >
              <Button href='#new-pin' size ='lg' disabled={ isLoading }>
                Create a City Canvas Pin
              </Button>
            </Col>
          </Row>
        </Container>

        <Container className='feed-cont'>
          <h3 className='head-text pri-color py-2'>My City Canvas</h3>
          <Row className='pt-2'>
            <Col>
              { isLoading
                ? <LoadingSpinner/>
                : pins.length
                  ? pins.map(pin => (
                    <PostCard
                      key={ pin.postId }
                      title={ pin.title }
                      artPhotoUrl={ pin.artPhotoUrl }
                      profileUrl={ user.photoUrl }
                      artistName={ pin.artistName }
                      button='Update'
                      href={ `#update-pin?postId=${pin.postId}` }
                      reported={ pin.reported }
                      savedByCurrentUser={ pin.savedByCurrentUser }
                    />
                  ))
                  : <h6
                    className='msg-font err-text pri-color text-center fw-bold'
                    >
                      Nothing to see here...<br />
                      Get out and start pinning some street art!
                      <br />
                      <br />
                      <a className='sec-color no-decoration' href='#new-pin'>
                        Create a City Canvas Pin here
                      </a>
                    </h6>
              }
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

MyCanvas.contextType = AppContext;
