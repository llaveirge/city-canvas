import React from 'react';
import { Container, Form, Row, Button } from 'react-bootstrap';

export default class SignInForm extends React.Component {

  render() {
    return (
      <Container className='sign-in-cont bg-white align-self-center'>
        <Row>
          <h1 className='head-text pri-color text-center'>City Canvas</h1>
        </Row>
        <Row>
        <Form className='sign-in-form'>
          <Form.Control
            autoFocus
            required
            id='username'
            type='text'
            name='username'
            placeholder='Username'
            autoComplete='username'
            />
             <Form.Control
            autoFocus
            required
            id='password'
            type='password'
            name='password'
            placeholder='Password'
            autoComplete='current-password'
            />
            <Button type='submit'>
              Submit
            </Button>

        </Form>
        </Row>
      </Container>
    );
  }

}
