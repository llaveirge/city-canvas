import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import PostCard from '../components/card';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';
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
      fetch('/api/home-feed')
        .then(response => response.json())
        .then(pins => {
          this.setState({ pins, isLoading: false });
        })
        .catch(err => {
          console.error('Fetch Failed!', err);
          this.setState({ networkError: true });
          this.toggleLoadingSpinner(this.state.isLoading);
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
                          saver={ pin.saver }
                          userId={ user.userId }
                          />
                      ))
                      : <h6 className='home-empty-heading pri-color text-center fw-bold'>
                        Brighten our community by contributing to City Canvas.
                          <br />Get out and start pinning some street art!
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
    );
  }
}

Home.contextType = AppContext;
