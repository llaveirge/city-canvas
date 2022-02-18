import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default function PostCard(props) {
  return (
    <>
      <Card>
        <Card.Img style={{ width: '100vw', maxHeight: '55vh', objectFit: 'cover' }} className='img-fluid' variant="top" src='https://i.guim.co.uk/img/media/aea3419b27b51390303b7a202e0725f0155841a2/0_0_3000_1800/master/3000.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=c715cc3a4fd6a5bac37bc316f0ebe370' />
        <Card.Body>
          <Card.Title className='head-text pri-color'>Cool Title</Card.Title>
          <Card.Text className='artist-text pri-color'>
            Artist: That One Guy
          </Card.Text>
          <Button>On The Map</Button>
        </Card.Body>
      </Card>
    </>

  );
}
