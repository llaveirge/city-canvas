import React from 'react';
import { Container, Col, Image, Card } from 'react-bootstrap';

export default function PinPage(props) {
  return (
    <>
      <Container className='d-flex pt-sm-5 pt-3 align-items-center feed-cont'>
        <Image className='profile-pic' src={'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2034&q=80'}></Image>
        <p className='username mb-0 ms-3'>Username</p>
      </Container>
      <Container className='mt-4 feed-cont'>
        <Card className='flex-sm-row'>
            <Col className='custom-basis'>
              <Card.Img src='https://images.unsplash.com/photo-1608317024553-9769b09329cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80' />
            </Col>
            <Col className='custom-basis'>
              <Card.Body>
                <Card.Title as='h4' className='py-2 head-text pri-color'>
                  Looking Up
                </Card.Title>
                <Card.Text className='fw-bold pri-color pb-1'>
                  Artist: Unknown
                </Card.Text>
                <Card.Link className='fw-bold map-link'>
                  <i className="me-2 fas fa-map-marker-alt fa-lg"></i>On The Map
                </Card.Link>
                <Card.Text className='pt-4'>
                  This piece is amongst all the little tags on the side of the wall by the old elementary school, and really shows the artist&apos;s skill in a blue study. Definitely worth checking out.
                </Card.Text>
              </Card.Body>
            </Col>
        </Card>
      </Container>

    </>
  );
}
