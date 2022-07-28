import React from 'react';
import { Container, Col, Button, Form, Row } from 'react-bootstrap';
import LoadingSpinner from './loading-spinner';
import InternalErrorPage from '../pages/internal-error';

export default class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first: '',
      last: '',
      email: '',
      username: '',
      password: '',
      passwordError: '',
      usernameError: '',
      emailError: '',
      imageError: '',
      isLoading: false,
      networkError: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.fileInputRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.passwordMessage = this.passwordMessage.bind(this);
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

  handleSubmit(event) {
    event.preventDefault();
    const { first, last, email, username, password, isLoading, usernameError, emailError, passwordError, imageError } = this.state;

    // clear the form error message text, if any:
    if (usernameError || emailError || passwordError || imageError) {
      this.setState({ usernameError: '', emailError: '', passwordError: '', imageError: '' });
    }

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
            if (response.error.includes('username')) {
              this.setState({ usernameError: response.error, isLoading: false });
            } else if (response.error.includes('email')) {
              this.setState({ emailError: response.error, isLoading: false });
            } else if (response.error.includes('password')) {
              this.setState({ passwordError: response.error, isLoading: false });
            } else if (response.error.includes('image')) {
              this.setState({ imageError: response.error, isLoading: false });
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

  render() {
    const { handleChange, handleSubmit, passwordMessage, state } = this;

    if (state.networkError) {
      return (
      <Container className='registration-cont bg-white d-flex justify-content-center pt-md-5'>
        <Row className='login-heading-row'>
          <h6 className='pt-5 px-5 saved-canvas-empty-heading pri-color text-center fw-bold'>
            Sorry, there was an error connecting to the network!
            Please check your internet connection and try again.
          </h6>
        </Row>
      </Container>
      );
    }

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
            />

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
              value={ state.email }
              onChange={ handleChange }
              aria-describedby='emailErrorMessage'
            />
             <Form.Text id='emailErrorMessage' className='d-block warning'>
            { state.emailError ? state.emailError : null }
            </Form.Text>

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
            <Form.Text id='usernameErrorMessage' className='d-block warning'>
              { state.usernameError ? state.usernameError : null }
            </Form.Text>

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
            <Form.Text id='imageErrorMessage' className='d-block warning'>
              { state.imageError ? state.imageError : null }
            </Form.Text>

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
            { state.isLoading ? <div className='absolute'> <LoadingSpinner /> </div> : null}
          </Form>
        </Col>
      </Container>
    );
  }
}
