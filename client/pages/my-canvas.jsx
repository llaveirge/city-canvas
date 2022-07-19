import React from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import PostCard from '../components/card';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';
import LoadingSpinner from '../components/loading-spinner';

export default class MyCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: [],
      isLoading: false
    };
  }

  componentDidMount() {
    const { user } = this.context;
    if (user) {
      this.setState({ isLoading: true });
      fetch(`/api/my-canvas-pins/${user.userId}`)
        .then(response => response.json())
        .then(pins => {
          this.setState({ pins, isLoading: false });
        });
    }
  }

  render() {
    const { pins, isLoading } = this.state;
    const { user } = this.context;

    if (!user) return <Redirect to='registration' />;

    return (
      <>
        <Container fluid className='pri-bk-color my-4 py-3'>
          <Row>
            <Col xs={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }} className='d-grid'>
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
                    saver={ pin.saver }
                    userId={ user.userId }
                  />
                  ))
                  : <h6 className='my-canvas-empty-heading pri-color text-center fw-bold'>
                    Nothing to see here...
                    <br/>Get out and start pinning some street art!
                  </h6>}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

MyCanvas.contextType = AppContext;
