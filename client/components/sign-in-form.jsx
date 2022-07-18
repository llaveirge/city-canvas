import React from 'react';
import { Container, Form, Row, Button } from 'react-bootstrap';
import LoadingSpinner from './loading-spinner';

export default class SignInForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.errorMessage = this.errorMessage.bind(this);
    this.toggleLoadingSpinner = this.toggleLoadingSpinner.bind(this);
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

  toggleLoadingSpinner(status) {
    const newStatus = !status;
    this.setState({ isLoading: newStatus });
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
    this.toggleLoadingSpinner(this.state.isLoading);
    fetch('/api/auth/sign-in', req)
      .then(res => {
        res.json().then(response => {
          if (response.error) {
            this.setState({ error: response.error });
            this.toggleLoadingSpinner(this.state.isLoading);
          } else if (response.user && response.token) {
            this.props.onSignIn(response);
            this.setState({
              error: null,
              username: '',
              password: ''
            });
            this.toggleLoadingSpinner(this.state.isLoading);
          }
        });
      })
      .catch(err => {
        console.error('Fetch Failed!', err);
        this.toggleLoadingSpinner(this.state.isLoading);
      });
  }

  render() {
    const { handleSubmit, handleChange, state, errorMessage } = this;
    return (
      <Container className='login-cont bg-white px-4 d-flex flex-row flex-wrap align-self-center'>
        <Row className='login-heading-row'>
          <h1 className='login-heading head-text pri-color text-center mt-5 mb-4 pt-4 pb-1'>
            City Canvas
          </h1>
        </Row>
        <Row className='login-form-row justify-content-center'>
          <Form
            className='login-form px-5 px-md-2 position-relative'
            onSubmit={ handleSubmit }>
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
              className='login-form-actions pb-1 mt-3 mb-5 d-flex justify-content-between'
            >
              <Button
                className='mt-1 mb-2'
                type='submit'
                disabled={ state.isLoading }>
                  Submit
              </Button>
                <a
                  href='#registration?form=sign-up'
                  className='reg-form-links mt-2 pri-color link'>
                    New here? Sign up
                </a>
            </div>
            { state.isLoading ? <LoadingSpinner className='py-0'/> : null}
          </Form>
        </Row>
      </Container>
    );
  }
}
