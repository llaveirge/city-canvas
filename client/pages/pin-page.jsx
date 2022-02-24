import React from 'react';
import { Container, Col, Image, Card } from 'react-bootstrap';

export default class PinPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pin: { postId: 2, title: 'Cool Thing', artistName: 'That One Guy', artPhotoUrl: 'https://images.unsplash.com/photo-1624198376649-c121a452d157?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80', comment: "This piece is amongst all the little tags on the side of the wall by the old elementary school, and really shows the artist's skill in a color choice and perspective. Definitely worth checking out.", lat: 42.361145, lng: -71.057083, reported: false, userId: 1, photUrl: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', userName: 'AwesomeFirstUser' }
    };
  }

  render() {
    const { pin } = this.state;

    return (
      <>
        <Container className='d-flex pt-sm-5 pt-3 align-items-center feed-cont'>
          <Image className='profile-pic' src={ pin.photUrl }></Image>
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
