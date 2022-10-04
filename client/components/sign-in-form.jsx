import React from 'react';
import { Container, Form, Row, Button } from 'react-bootstrap';
import InternalErrorPage from '../pages/internal-error';
import NetworkErrorPage from '../pages/network-error';
import LoadingSpinner from './loading-spinner';

export default class SignInForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false,
      networkError: false,
      formErrors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.errorMessage = this.errorMessage.bind(this);
    this.toggleLoadingSpinner = this.toggleLoadingSpinner.bind(this);
  }

  // Display form field error to user when field doesn't meet requirements
  errorMessage(message, idName) {
    if (message) {
      return (
        <Form.Text id={ idName } className='d-block warning'>
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
    const { username, password, formErrors } = this.state;
    let errorsPresent = false;

    // clear the form error message text, if any:
    if (formErrors) {
      this.setState({ formErrors: {}, error: null });
    }

    // check for empty fields and display error message to user where applicable:
    if (!username) {
      this.setState(oldState => ({
        formErrors: {
          ...oldState.formErrors,
          usernameError: 'Username is a required field'
        },
        isLoading: false
      }));
      errorsPresent = true;
    }
    if (!password) {
      this.setState(oldState => ({
        formErrors: {
          ...oldState.formErrors,
          passwordError: 'Password is a required field'
        },
        isLoading: false
      }));
      errorsPresent = true;
    }

    if (!errorsPresent) {
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
              if (response.error.includes('login')) {
                this.setState({ error: response.error });
                this.toggleLoadingSpinner(this.state.isLoading);
                errorsPresent = true;
              } else {
                this.setState({ internalError: true });
                this.toggleLoadingSpinner(this.state.isLoading);
              }
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
          this.setState({ networkError: true });
          this.toggleLoadingSpinner(this.state.isLoading);
        });
    }
  }

  render() {
    const { handleSubmit, handleChange, state, errorMessage, props } = this;

    if (state.networkError) {
      return (
         <Container className='login-cont bg-white px-4 d-flex flex-row flex-wrap align-self-center'>
        <Row className='login-heading-row'>
          <NetworkErrorPage />
        </Row>
        </Container>
      );
    }

    if (state.internalError) {
      return (
      <Container className='login-cont bg-white px-4 d-flex flex-row flex-wrap align-self-center'>
        <Row className='login-heading-row'>
          <InternalErrorPage />
        </Row>
        </Container>
      );
    }

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
              autoFocus
              required
              id='username'
              type='text'
              name='username'
              placeholder='Username'
              autoComplete='username'
              value={ state.username }
              onChange={ handleChange }
              aria-describedby='usernameErrorMessage'
            />
            { state.formErrors.usernameError ? errorMessage(state.formErrors.usernameError, 'usernameErrorMessage') : null }

            <Form.Control
              required
              className='mt-4'
              id='password'
              type='password'
              name='password'
              placeholder='Password'
              autoComplete='current-password'
              value={ state.password }
              onChange={ handleChange }
              aria-describedby='errorMessage passwordErrorMessage'
            />
            { state.formErrors.passwordError ? errorMessage(state.formErrors.passwordError, 'passwordErrorMessage') : null }
            { errorMessage(state.error, 'errorMessage') }

            <div
              className='login-form-actions pb-1 mt-3 mb-3 d-flex justify-content-between'
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
                    { !props.type
                      ? 'New here? Sign up'
                      : 'Join in & sign up' }
                </a>
            </div>
            <div className='text-center mb-4'>
              <a
                href={ !props.type
                  ? '#registration?form=sign-in&type=demo'
                  : '#registration?form=sign-in' }
                className='reg-form-links pri-color link'>
                  { !props.type
                    ? 'Want a test drive? Login as a guest'
                    : 'Already signed up? Return to Sign-In page'}
              </a>

            </div>
            { state.isLoading ? <div className='spin-absolute'> <LoadingSpinner/> </div> : null}
          </Form>
        </Row>
      </Container>
    );
  }
}
