import React from 'react';
import { Card, Button, Image, Container } from 'react-bootstrap';

export default function PostCard(props) {
  return (
    <>
      <Card>
        <Card.Img
          className='img-fluid pin-img-top'
          variant='top'
          src={ props.artPhotoUrl } />
        <Card.Body className='px-2 pt-2 px-sm-4'>
          <Container className='d-flex px-0'>
            <Container className='img-cont' >
              <Image
                className='profile-pic sec-bk-color'
                src={ props.profileUrl }>
              </Image>
            </Container>
            <Container className='art-info d-flex flex-column px-2 px-sm-3'>
              <Container className='title-report d-flex flex-row justify-content-between align-items-baseline px-1'>
                <Card.Title
                  as='h4'
                  className={
                    `postcard-title head-text pri-color py-2 text-break ${props.reported === true
                      ? 'me-1'
                      : ''}`
                  }
                >
                  { props.title }
                </Card.Title>
                { props.reported === true
                  ? <span className='warning text-nowrap'>
                        <i className='fas fa-exclamation fa-md'></i>
                        <i className='ms-1 fas fa-eye-slash fa-md'></i>
                      </span>
                  : null}
              </Container>
              <Container className='artist-save d-flex flex-row justify-content-between px-1'>
                <Card.Text className='fw-bold pri-color pin-text text-break'>
                  Artist: { props.artistName }
                </Card.Text>
                { props.saver !== props.userId
                  ? null
                  : <i className='sec-color fas fa-heart fa-lg ms-2'></i> }
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
