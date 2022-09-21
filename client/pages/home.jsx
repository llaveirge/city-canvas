import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import PostCard from '../components/card';
import { AppContext } from '../lib';
import Redirect from '../components/redirect';
import InternalErrorPage from './internal-error';
import NetworkErrorPage from './network-error';
import LoadingSpinner from '../components/loading-spinner';

export default class Home extends React.Component {
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
      fetch(`/api/home-feed/${user.userId}`)
        .then(res => {
          if (res.ok) {
            res.json().then(pins => {
              this.setState({ pins, isLoading: false });
            });
          } else {
            res.json().then(response => {
              console.error(response.error);
              this.setState({ internalError: true, isLoading: false });
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
    const { pins, isLoading, networkError, internalError } = this.state;
    const { user } = this.context;

    if (!user) return <Redirect to='registration' />;
    if (networkError) return <NetworkErrorPage />;
    if (internalError) return <InternalErrorPage />;

    return (
         <Container className='feed-cont'>
              <Row className='pt-5'>
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
                          savedByCurrentUser={ pin.savedByCurrentUser }
                          />
                      ))
                      : <h6 className='no-results-heading pri-color text-center fw-bold error-text'>
                        Brighten our community by contributing to City Canvas.
                          <br />Get out and start pinning some street art!
                          <br />
                          <br />
                            <a className='sec-color fw-bold no-decoration' href='#new-pin'>
                            Create a City Canvas Pin here
                            </a>
                        </h6>
                  }
                </Col>
              </Row>
            </Container>
    );
  }
}

Home.contextType = AppContext;
