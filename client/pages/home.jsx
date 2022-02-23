import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import PostCard from '../components/card';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: [{
        artPhotoUrl: 'https://images.unsplash.com/photo-1624198376649-c121a452d157?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
        artistName: 'Another Guy',
        postId: 1,
        reported: false,
        title: 'Rad Painting',
        userId: 1
      },
      {
        artPhotoUrl: 'https://images.unsplash.com/photo-1628064009888-ef9e3d2d14c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
        artistName: 'Different Person',
        postId: 2,
        reported: false,
        title: 'Even More Rad Painting',
        userId: 2
      }],
      users: [{
        userId: 1, profileUrl: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
      },
      {
        userId: 2, profileUrl: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2034&q=80'
      }
      ]
    };

    this.matchUser = this.matchUser.bind(this);
  }

  matchUser(pin) {
    const id = pin.userId;
    const users = this.state.users;
    for (const user of users) {
      if (user.userId === id) {
        return user.profileUrl;
      }
    }
  }

  render() {
    const { pins } = this.state;

    return (
      <Container className='feed-cont'>
        <Row className='pt-2'>
          <Col className='justify-content-center'>
            {pins.map(pin => (
              <PostCard
              key={pin.postId}
              title={pin.title}
              artPhotoUrl={pin.artPhotoUrl}
              profileUrl={ this.matchUser(pin) }
              artistName={pin.artistName}
              button='View More'
              />
            ))}
          </Col>
        </Row>
      </Container>
    );
  }

}
