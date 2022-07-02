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
    this.errorMessage = this.errorMessage.bind(this);
  }

  errorMessage(message) {
    if (message) {
      return (
        <Form.Text id='errorMessage' className='d-block warning'>
          { message }
        </Form.Text>
      );
    }
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
      .then(res => {
        res.json().then(response => {
          if (response.error) {
            this.setState({ error: response.error });
          } else if (response.user && response.token) {
            this.props.onSignIn(response);
            this.setState({
              error: null,
              username: '',
              password: ''
            });
          }
        });
      })
      .catch(err => console.error('Fetch Failed!', err));
  }

  render() {
    const { handleSubmit, handleChange, state, errorMessage } = this;
    return (
      <Container className='sign-in-cont bg-white px-4 d-flex flex-row flex-wrap align-self-center'>
        <Row className='login-heading-row'>
          <h1 className='login-heading head-text pri-color text-center mt-5 mb-4 pt-4 pb-1'>
            City Canvas
          </h1>
        </Row>
        <Row className='login-form-row justify-content-center'>
          <Form className='sign-in-form px-5 px-md-2' onSubmit={ handleSubmit }>
            <Form.Control
              className='mb-4'
              autoFocus
              required
              id='username'
              type='text'
              name='username'
              placeholder='Username'
              autoComplete='username'
              value={ state.username }
              onChange={ handleChange }
            />
            <Form.Control
              required
              id='password'
              type='password'
              name='password'
              placeholder='Password'
              autoComplete='current-password'
              value={ state.password }
              onChange={ handleChange }
              aria-describedby='errorMessage'
              />
              { errorMessage(state.error) }

              <div
                className='login-form-actions pb-3 mt-3 mb-5 d-flex justify-content-between'
              >
                <Button className='mt-1' type='submit'>
                  Submit
                </Button>
                <a href='#registration?form=sign-up' className='sign-up-link mt-2 pri-color link'>
                  New here? Sign up
                </a>
              </div>
          </Form>
        </Row>
      </Container>
    );
  }
}
