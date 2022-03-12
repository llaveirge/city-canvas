import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import PostCard from '../components/card';

export default class SavedPins extends React.Component {

  render() {
    return (
      <Container className='feed-cont'>
          <h3 className='head-text pri-color mt-3 py-3'>My Saved City Canvas</h3>
        <Row className='pt-2'>
          <Col className='justify-content-center'>
            <PostCard
              key={ 3 }
              title={ 'Look Up' }
              artPhotoUrl={ 'https://images.unsplash.com/photo-1608317024553-9769b09329cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80' }
              profileUrl={ 'https://qph.fs.quoracdn.net/main-qimg-7cfed85bb8a41d239fae5d82fece79b1' }
              artistName={ 'Unknown' }
              button='View More'
              href={'#pins?postId=3'}
              saved={ '2022-03-11T19:06:07.326574Z' }
              />
              <PostCard
              key={ 5 }
              title={ 'Mother' }
              artPhotoUrl={ 'https://images.unsplash.com/photo-1608317024553-9769b09329cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80' }
              profileUrl={ 'https://i.pinimg.com/236x/0c/3f/8f/0c3f8f47f143a37f8e53fa4bae4786f8--lord-rings-lord-of-the-rings.jpg' }
              artistName={ 'L.N. Naga' }
              button='View More'
              href={'#pins?postId=5'}
              saved={ '2022-03-11T19:29:09.201163Z' }
              />
          </Col>
        </Row>
      </Container>
    );
  }
}
