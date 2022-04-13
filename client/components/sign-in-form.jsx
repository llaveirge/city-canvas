import React from 'react';
import { Container, Form, Row, Button } from 'react-bootstrap';

export default class SignInForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/auth/sign-in', req)
      .then(res => res.json())
      .then(result => {
        if (result.user && result.token) {
          this.props.onSignIn(result);
        }
      })
      .catch(err => console.error('Fetch Failed!', err));
  }

  render() {
    const { handleSubmit } = this;
    return (
      <Container className='sign-in-cont bg-white align-self-center'>
        <Row>
          <h1 className='head-text pri-color text-center mar-top-4r mb-4 py-3'>City Canvas</h1>
        </Row>
        <Row className='d-flex justify-content-center'>
        <Form className='sign-in-form' onSubmit={ handleSubmit }>
          <Form.Control
            className='mb-4'
            autoFocus
            required
            id='username'
            type='text'
            name='username'
            placeholder='Username'
            autoComplete='username'
            value={ this.state.username}
            onChange={ this.handleChange }
            />
            <Form.Control
            className='mb-4'
            required
            id='password'
            type='password'
            name='password'
            placeholder='Password'
            autoComplete='current-password'
            value={ this.state.password }
            onChange={ this.handleChange}
            />
            <div className='pb-3 d-flex align-items-baseline justify-content-between'>
              <Button className='mt-2 mar-bottom-4r' type='submit'>
                Submit
              </Button>
              <a href='#registration?form=sign-up' className='pri-color link'>New here? Sign up </a>
            </div>
        </Form>
        </Row>
      </Container>
    );
  }

}
