import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import PostCard from '../components/card';

export default class SavedPins extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: [
        {
          artPhotoUrl: 'https://bloximages.newyork1.vip.townnews.com/gazette.com/content/tncms/assets/v3/editorial/1/11/111fbde2-a061-11ea-ad32-bfb117588960/5ecedbafd9e1f.image.jpg?crop=1637%2C1228%2C0%2C19&resize=1637%2C1228&order=crop%2Cresize',
          artistName: 'Matthew Carlson',
          lat: 38.83387105305894,
          lng: -104.82266124016441,
          photoUrl: 'https://i.redd.it/gikb0vjg40651.jpg',
          postId: 7,
          reported: false,
          saved: '2022-03-11T19:24:49.044Z',
          saver: 1,
          title: 'Guardian',
          userId: 1,
          UserName: 'TheRealSlimBaggins'
        }
      ]
    };
  }

  render() {
    const { pins } = this.state;

    return (
      <Container className='feed-cont'>
          <h3 className='head-text pri-color mt-3 py-3'>My Saved City Canvas</h3>
        <Row className='pt-2'>
          <Col className='justify-content-center'>
            {pins.map(pin => (
              <PostCard
              key={ pin.postId }
              title={ pin.title }
              artPhotoUrl={ pin.artPhotoUrl }
              profileUrl={ pin.photoUrl }
              artistName={ pin.artistName }
              button='View More'
              href={`#pins?postId=${pin.postId}`}
              saved={ pin.saved }
              />
            ))}
          </Col>
        </Row>
      </Container>
    );
  }
}
