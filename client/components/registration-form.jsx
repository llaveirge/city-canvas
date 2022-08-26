import React from 'react';
import { Container, Col, Button, Form, Row } from 'react-bootstrap';
import LoadingSpinner from './loading-spinner';
import InternalErrorPage from '../pages/internal-error';
import NetworkErrorPage from '../pages/network-error';

export default class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first: '',
      last: '',
      email: '',
      username: '',
      password: '',
      isLoading: false,
      networkError: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.fileInputRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.passwordMessage = this.passwordMessage.bind(this);
    this.errorMessage = this.errorMessage.bind(this);
    this.toggleLoadingSpinner = this.toggleLoadingSpinner.bind(this);
  }

  toggleLoadingSpinner(status) {
    const newStatus = !status;
    this.setState({ isLoading: newStatus });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  passwordMessage(passwordStatus) {
    if (passwordStatus) {
      return (
        <Form.Text id='passwordErrorMessage' className='d-block warning'>
          { this.state.passwordError }
        </Form.Text>
      );
    } else {
      return (
        <Form.Text id='passwordHelpBlock' className='d-block' muted>
          Password must include at least six characters and one number.
        </Form.Text>
      );
    }
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

  handleSubmit(event) {
    event.preventDefault();
    const { first, last, email, username, password, isLoading, usernameError, emailError, passwordError, imageError, firstError, lastError } = this.state;

    // clear the form error message text, if any:
    if (usernameError || emailError || passwordError || imageError || firstError || lastError) {
      this.setState({ usernameError: '', emailError: '', passwordError: '', imageError: '', firstError: '', lastError: '' });
    }

    // check for empty fields and display error message to user where applicable:
    if (!first) {
      this.setState({ firstError: 'First Name is a required field', isLoading: false });
    } else if (!last) {
      this.setState({ lastError: 'Last Name is a required field', isLoading: false });
    } else if (!email) {
      this.setState({ emailError: 'Email is a required field', isLoading: false });
    } else if (!username) {
      this.setState({ usernameError: 'Username is a required field', isLoading: false });
    } else if (!this.fileInputRef.current.files[0]) {
      this.setState({ imageError: 'A Profile Photo upload is required', isLoading: false });
    } else if (!password) {
      this.setState({ passwordError: 'A password is required', isLoading: false });
    } else {

      const formData = new FormData();
      formData.append('first', first);
      formData.append('last', last);
      formData.append('email', email);
      formData.append('username', username);
      formData.append('password', password);
      formData.append('image', this.fileInputRef.current.files[0]);

      const req = {
        method: 'POST',
        body: formData
      };
      this.toggleLoadingSpinner(isLoading);
      fetch('/api/auth/sign-up', req)
        .then(res => {
          if (!res.ok) {
            res.json().then(response => {
              console.error(response.error);
              if (response.error.includes('email')) {
                this.setState({ emailError: response.error, isLoading: false });
              } else if (response.error.includes('password')) {
                this.setState({ passwordError: response.error, isLoading: false });
              } else {
                this.setState({ internalError: true });
                this.toggleLoadingSpinner(this.state.isLoading);
              }
            });
          } else {
            this.setState({
              first: '',
              last: '',
              email: '',
              username: '',
              password: '',
              passwordError: '',
              usernameError: '',
              emailError: '',
              imageError: ''
            });
            this.fileInputRef.current.value = null;
            this.toggleLoadingSpinner(isLoading);
            window.location.hash = 'registration';
          }
        })
        .catch(err => {
          console.error('Fetch Has Failed!', err);
          this.setState({ networkError: true });
          this.toggleLoadingSpinner(isLoading);
        });
    }
  }

  render() {
    const { handleChange, handleSubmit, passwordMessage, state } = this;

    if (state.networkError) return <NetworkErrorPage />;
    if (state.internalError) {
      return (
      <Container className='registration-cont bg-white d-flex justify-content-center pt-md-5'>
        <Row className='login-heading-row'>
          <InternalErrorPage />
        </Row>
        </Container>
      );
    }

    return (
        <Container
          className='registration-cont bg-white d-flex justify-content-center pt-md-5'>
          <Col className='reg-form-col'>
            <h1 className='head-text pri-color text-center mt-4'>
              Create an Account
            </h1>
          <Form className='position-relative pb-4' onSubmit={ handleSubmit }>
            <Form.Label className='mt-2' htmlFor='first'>
              First Name
            </Form.Label>
            <Form.Control
              required
              autoFocus
              id='first'
              className='mb-1'
              type='text'
              name='first'
              placeholder='Enter First Name'
              autoComplete='given-name'
              value={ state.first }
              onChange={ handleChange }
              aria-describedby='firstErrorMessage'
            />
            { state.firstError ? this.errorMessage(state.firstError, 'firstErrorMessage') : null }

            <Form.Label className='mt-2' htmlFor='last'>
              Last Name
            </Form.Label>
            <Form.Control
              required
              id='last'
              className='mb-1'
              type='text'
              name='last'
              placeholder='Enter Last Name'
              autoComplete='family-name'
              value={ state.last }
              onChange={ handleChange }
              aria-describedby='lastErrorMessage'
            />
            { state.lastError ? this.errorMessage(state.lastError, 'lastErrorMessage') : null }

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
              value={ state.email }
              onChange={ handleChange }
              aria-describedby='emailErrorMessage'
            />
            { state.emailError ? this.errorMessage(state.emailError, 'emailErrorMessage') : null }

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
              value={ state.username }
              onChange={ handleChange }
              aria-describedby='usernameErrorMessage'
            />
            { state.usernameError ? this.errorMessage(state.usernameError, 'usernameErrorMessage') : null }

            <Form.Label className='mt-2' htmlFor='image'>
              Profile Photo
            </Form.Label>
            <Form.Control
              required
              id='image'
              className='mb-1'
              type='file'
              name='image'
              ref={ this.fileInputRef }
              accept='.png, .jpg, .jpeg, .gif'
              aria-describedby='imageErrorMessage'
            />
            { state.imageError ? this.errorMessage(state.imageError, 'imageErrorMessage') : null }

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
              value={ state.password }
              onChange={ handleChange }
              aria-describedby='passwordHelpBlock passwordErrorMessage'
            />
            { passwordMessage(state.passwordError) }
            <div
              className='login-form-actions pb-4 d-flex justify-content-between'
            >
              <Button className='mt-4 mb-2' type='submit' disabled={ state.isLoading }>
                Submit
              </Button>
              <a
                href='#registration'
                className='reg-form-links link my-2 pri-color'>
                Already signed up? Sign in
              </a>
            </div>
            { state.isLoading ? <div className='spin-absolute'> <LoadingSpinner /> </div> : null}
          </Form>
        </Col>
      </Container>
    );
  }
}
