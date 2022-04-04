import React from 'react';
import { Container, Col, Button, Form } from 'react-bootstrap';

export default class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first: '',
      last: '',
      email: '',
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { handleChange } = this;

    return (
        <Container className='cont-registration bg-white d-flex justify-content-center pt-md-5'>
          <Col className='reg-form-col'>
            <h1 className='head-text pri-color text-center mt-4'>
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
              autoComplete='given-name'
              onChange={ handleChange }
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
              autoComplete='family-name'
              onChange={ handleChange }
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
              autoComplete='email'
              onChange={ handleChange }
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
              autoComplete='username'
              onChange={ handleChange }
            />
            <Form.Label>Profile Photo</Form.Label>
            <Form.Control
              id='image'
              type='file'
              name='image'
              ref={ this.fileInputRef }
              accept='.png, .jpg, .jpeg, .gif'
            />
             <Form.Label className='mt-2' htmlFor='password'>
                  Create Your Password
            </Form.Label>
            <Form.Control
              required
              id='password'
              type='password'
              name='password'
              placeholder='Enter Password'
              autoComplete='new-password'
              onChange={ handleChange }
            />
            <Button className='mt-4 mb-2' type='submit'>
              Submit
            </Button>
        </Form>
        </Col>
      </Container>
    );
  }
}
