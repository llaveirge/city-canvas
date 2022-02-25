import React from 'react';
import { Container, Col, Image, Card } from 'react-bootstrap';

export default class PinPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pin: {}
    };
  }

  componentDidMount() {
    fetch(`/api/pins/${this.props.postId}`)
      .then(res => res.json())
      .then(pin => this.setState({ pin }));
  }

  render() {
    const { pin } = this.state;

    if (pin.error) {
      return (
        <Container className='text-center'>
          <h2 className='mt-5 pri-color nf'> 404 </h2>
          <p className='my-2'>{pin.error}</p>
          <a href="#" className='pri-color'>Return to the City Canvas home feed</a>
        </Container>
      );
    }

    return (
      <>
        <Container className='d-flex pt-sm-5 pt-3 align-items-center feed-cont'>
          <Image className='profile-pic' src={ pin.photoUrl }></Image>
          <p className='username mb-0 ms-3'>{ pin.userName }</p>
        </Container>
        <Container className='mt-4 feed-cont'>
          <Card className='flex-sm-row'>
              <Col>
                <Card.Img className='full-pin-img' src={ pin.artPhotoUrl } />
              </Col>
              <Col className='custom-basis'>
                <Card.Body>
                  <Card.Title as='h4' className='py-2 head-text pri-color'>
                    { pin.title }
                  </Card.Title>
                  <Card.Text className='fw-bold pri-color pb-1'>
                    Artist: { pin.artistName }
                  </Card.Text>
                  <Card.Link className='fw-bold map-link'>
                    <i className="me-2 fas fa-map-marker-alt fa-lg"></i>On The Map
                  </Card.Link>
                  <Card.Text className='pt-4'>
                    { pin.comment }
                  </Card.Text>
                </Card.Body>
              </Col>
          </Card>
        </Container>
      </>
    );
  }
}
