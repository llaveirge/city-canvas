import React from 'react';
import { Container, Form, Row, Button } from 'react-bootstrap';

export default class SignInForm extends React.Component {

  render() {
    return (
      <Container className='sign-in-cont bg-white align-self-center'>
        <Row>
          <h1 className='head-text pri-color text-center mar-top-4r mb-4 py-3'>City Canvas</h1>
        </Row>
        <Row className='d-flex justify-content-center'>
        <Form className='sign-in-form'>
          <Form.Control
            className='mb-4'
            autoFocus
            required
            id='username'
            type='text'
            name='username'
            placeholder='Username'
            autoComplete='username'
            />
            <Form.Control
            className='mb-4'
            autoFocus
            required
            id='password'
            type='password'
            name='password'
            placeholder='Password'
            autoComplete='current-password'
            />
            <Button className='mt-2 mar-bottom-4r' type='submit'>
              Submit
            </Button>

        </Form>
        </Row>
      </Container>
    );
  }

}
