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
      <Container className='sign-in-cont bg-white align-self-center'>
        <Row>
          <h1 className='head-text pri-color text-center mar-top-4r mb-4 py-3'>
            City Canvas
          </h1>
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
                className='pb-3 mt-4 d-flex align-items-baseline justify-content-between'>
                <Button className='mt-2 mar-bottom-4r' type='submit'>
                  Submit
                </Button>
                <a href='#registration?form=sign-up' className='pri-color link'>
                  New here? Sign up
                </a>
              </div>
          </Form>
        </Row>
      </Container>
    );
  }
}
