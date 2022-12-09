import React from 'react';
import {
  Container,
  Form,
  Row,
  Button,
  Tooltip,
  OverlayTrigger
} from 'react-bootstrap';
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

    this.toggleLoadingSpinner = this.toggleLoadingSpinner.bind(this);
    this.errorMessage = this.errorMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.guestLogin = this.guestLogin.bind(this);
  }

  toggleLoadingSpinner(status) {
    const newStatus = !status;
    this.setState({ isLoading: newStatus });
  }

  errorMessage(message, idName) {
    if (message) {
      return (
        <Form.Text id={ idName } className='d-block warning'>
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
    const { username, password, formErrors } = this.state;
    let errorsPresent = false;

    if (formErrors) {
      this.setState({ formErrors: {}, error: null });
    }

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

  // Submit form with demo user login credentials:
  guestLogin(event) {
    event.preventDefault();
    let errorsPresent = false;

    if (!errorsPresent) {
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: 'guest username', password: 'guest password' })
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
    const { handleSubmit, handleChange, state, errorMessage } = this;
    const { formErrors } = state;

    if (state.networkError) {
      return (
        <Container
          className='login-cont bg-white d-flex align-self-center px-4'
        >
          <Row className='login-heading-row'>
            <NetworkErrorPage />
          </Row>
        </Container>
      );
    }

    if (state.internalError) {
      return (
        <Container
          className='login-cont bg-white d-flex align-self-center px-4'
        >
          <Row className='login-heading-row'>
            <InternalErrorPage />
          </Row>
        </Container>
      );
    }

    return (
      <Container
        className='login-cont bg-white d-flex flex-wrap align-self-center px-4'
      >
        <Row className='login-heading-row'>
          <h1 className='head-text pri-color text-center mt-4 mb-3 pt-4 pb-1'>
            City Canvas
          </h1>
          <h2
            className='msg-font fs-5-5 pri-color text-center mb-4 pb-3'
          >
            Share and discover street art in your city and beyond!
          </h2>
        </Row>
        <Row className='login-form-row justify-content-center'>

          <Form
            className='login-form position-relative pb-4 px-5 px-md-2'
            onSubmit={ handleSubmit }
          >
            <Form.Control
              autoFocus
              required
              id='username'
              type='text'
              name='username'
              value={ state.username }
              placeholder='Username'
              autoComplete='username'
              onChange={ handleChange }
              aria-describedby='usernameErrorMessage'
            />
            { formErrors.usernameError
              ? errorMessage(formErrors.usernameError, 'usernameErrorMessage')
              : null
            }

            <Form.Control
              required
              id='password'
              className='mt-4'
              type='password'
              name='password'
              value={ state.password }
              placeholder='Password'
              autoComplete='current-password'
              onChange={ handleChange }
              aria-describedby='errorMessage passwordErrorMessage'
            />
            { formErrors.passwordError
              ? errorMessage(formErrors.passwordError, 'passwordErrorMessage')
              : null
            }
            { errorMessage(state.error, 'errorMessage') }

            <div
              className='login-form-actions d-flex justify-content-between pb-1
                my-3'
            >
              <Button
                className='mt-1 mb-2'
                type='submit'
                disabled={ state.isLoading }>
                  Submit
              </Button>
                <a
                  href='#registration?form=sign-up'
                  className='reg-form-links pri-color link mt-2'>
                    New here? Sign up
                </a>
            </div>

            <div className='d-grid gap-2 pb-1 mt-3 mb-4'>
              <OverlayTrigger
                placement='top'
                overlay={
                  <Tooltip id='guest-login-tooltip'>
                    Sign in as guest, DemoDane
                  </Tooltip>
                }>
                  <Button
                    type='button'
                    size='lg'
                    className='mt-1 mb-2'
                    onClick={ this.guestLogin }
                    disabled={ state.isLoading }>
                      Sign In as Guest
                  </Button>
              </OverlayTrigger>
             </div>
            { state.isLoading
              ? <div className='spin-absolute'><LoadingSpinner /></div>
              : null
            }
          </Form>

        </Row>
      </Container>
    );
  }
}
