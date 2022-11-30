import React from 'react';
import { Card, Button, Image, Container } from 'react-bootstrap';

export default function PostCard(props) {
  return (
    <>
      <Card>
        <Card.Img
          className='img-fluid pin-img-top'
          variant='top'
          src={ props.artPhotoUrl }
        />

        <Card.Body className='px-2 pt-2 px-sm-4'>
          <Container className='d-flex px-0'>
            <Container className='img-cont'>
              <Image
                className='profile-pic sec-bk-color'
                src={ props.profileUrl }
              >
              </Image>
            </Container>
            <Container className='d-flex flex-column px-2 px-sm-3'>
              <Container
                className='title-report d-flex flex-row justify-content-between
                  align-items-baseline px-1'
              >
                <Card.Title
                  as='h4'
                  className={
                    `postcard-title head-text pri-color text-break py-2 ${
                      props.reported === true
                      ? 'me-2'
                      : ''}`
                  }
                >
                  { props.title }
                </Card.Title>
                { props.reported === true
                  ? <span className='warning text-nowrap'>
                        <i className='fas fa-exclamation fa-md'></i>
                        <i className='fas fa-eye-slash fa-md ms-1'></i>
                      </span>
                  : null
                }
              </Container>
              <Container className='artist-save d-flex flex-row
              justify-content-between px-1'>
                <Card.Text className='fw-bold pri-color pin-text text-break'>
                  Artist: { props.artistName }
                </Card.Text>
                { props.savedByCurrentUser === null
                  ? null
                  : <i className='sec-color fas fa-heart fa-lg ms-2'></i>
                }
              </Container>
            </Container>
          </Container>

          <Container className='d-grid'>
            <Button size='lg' className='mt-3' href={ props.href }>
              { props.button }
            </Button>
          </Container>
        </Card.Body>

      </Card>
    </>
  );
}
