import React from 'react';
import { Container, Col, Button, Form } from 'react-bootstrap';

export default class RegistrationForm extends React.Component {

  render() {
    return (
        <Container className='cont-registration bg-white d-flex justify-content-center pt-5 py-sm-0'>
          <Col className='reg-form-col'>
            <h1 className='head-text pri-color pt-3 pt-sm-5 text-center'>
                Create an Account
              </h1>
          <Form>
            <Form.Label className='mt-2' htmlFor='first'>
                  First Name
            </Form.Label>
            <Form.Control
              required
              autoFocus
              id='first'
              type='text'
              name='first'
              placeholder='Enter First Name'
            />
            <Form.Label className='mt-2' htmlFor='last'>
                  Last Name
            </Form.Label>
            <Form.Control
              required
              id='last'
              type='text'
              name='last'
              placeholder='Enter Last Name'
            />
             <Form.Label className='mt-2' htmlFor='email'>
                  Email
            </Form.Label>
            <Form.Control
              required
              id='email'
              type='email'
              name='email'
              placeholder='Enter Email Address'
            />
             <Form.Label className='mt-2' htmlFor='username'>
                  Username
            </Form.Label>
            <Form.Control
              required
              id='username'
              type='text'
              name='username'
              placeholder='Username'
            />
            <Form.Label>Profile Photo:</Form.Label>
            <Form.Control
              id='image'
              type='file'
              name='image'
              ref={ this.fileInputRef }
              accept='.png, .jpg, .jpeg, .gif'
            />
             <Form.Label className='mt-2' htmlFor='username'>
                  Create Your Password
            </Form.Label>
            <Form.Control
              required
              id='password'
              type='password'
              name='password'
              placeholder='Enter Password'
            />
            <Button className='mt-3 mb-4' type='submit'>
              Submit
            </Button>
        </Form>
        </Col>
      </Container>
    );
  }
}
