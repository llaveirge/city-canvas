import React from 'react';
import { Container, Col, Button, Form, Row } from 'react-bootstrap';
import LoadingSpinner from './loading-spinner';
import InternalErrorPage from '../pages/internal-error';
import NetworkErrorPage from '../pages/network-error';
import { checkAlphanumeric } from '../lib';

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
      networkError: false,
      formErrors: {}
    };

    this.toggleLoadingSpinner = this.toggleLoadingSpinner.bind(this);
    this.passwordMessage = this.passwordMessage.bind(this);
    this.errorMessage = this.errorMessage.bind(this);
    this.fileInputRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleLoadingSpinner(status) {
    const newStatus = !status;
    this.setState({ isLoading: newStatus });
  }

  /* Display password form field help block text or error when password
  requirements are not met: */
  passwordMessage(passwordStatus) {
    if (passwordStatus) {
      return (
        <Form.Text id='passwordErrorMessage' className='warning d-block'>
          { this.state.formErrors.passwordError }
        </Form.Text>
      );
    } else {
      return (
        <Form.Text id='passwordHelpBlock' className='d-block' muted>
          Password must include at least six characters and one number
        </Form.Text>
      );
    }
  }

  // Display form field error to user when field doesn't meet requirements:
  errorMessage(message, idName) {
    if (message) {
      return (
        <Form.Text id={ idName } className='warning d-block'>
          { message }
        </Form.Text>
      );
    }
  }

  // Update state with form field changes:
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      first,
      last,
      email,
      username,
      password,
      isLoading,
      formErrors
    } = this.state;
    let errorsPresent = false;

    // Clear the form error message text, if any:
    if (formErrors) {
      this.setState({ formErrors: {} });
    }

    // Check for empty fields and display error message where applicable:
    if (!first || !checkAlphanumeric(first)) {
      this.setState(oldState => ({
        formErrors: {
          ...oldState.formErrors,
          firstError: 'First Name is a required field'
        },
        isLoading: false
      }));
      errorsPresent = true;
    }
    if (!last || !checkAlphanumeric(last)) {
      this.setState(oldState => ({
        formErrors: {
          ...oldState.formErrors,
          lastError: 'Last Name is a required field'
        },
        isLoading: false
      }));
      errorsPresent = true;
    }
    if (!email) {
      this.setState(oldState => ({
        formErrors: {
          ...oldState.formErrors,
          emailError: 'Email is a required field'
        },
        isLoading: false
      }));
      errorsPresent = true;
    }
    if (!username || !checkAlphanumeric(username)) {
      this.setState(oldState => ({
        formErrors: {
          ...oldState.formErrors,
          usernameError: 'Username is a required field'
        },
        isLoading: false
      }));
      errorsPresent = true;
    }
    if (!this.fileInputRef.current.files[0]) {
      this.setState(oldState => ({
        formErrors: {
          ...oldState.formErrors,
          imageError: 'A Profile Photo upload is required'
        },
        isLoading: false
      }));
      errorsPresent = true;
    }
    if (!password ||
      !checkAlphanumeric(password) ||
      password.includes(' ') ||
      password.length < 6 ||
      /\d/.test(password) === false
    ) {
      this.setState(oldState => ({
        formErrors: {
          ...oldState.formErrors,
          passwordError: 'Invalid password: Password must include at least six characters and one number'
        },
        isLoading: false
      }));
      errorsPresent = true;
    }

    // If there are no form errors present, submit form data:
    if (!errorsPresent) {
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
                this.setState(oldState => ({
                  formErrors: {
                    ...oldState.formErrors,
                    emailError: response.error
                  },
                  isLoading: false
                }));
                errorsPresent = true;
              } else if (response.error.includes('password')) {
                this.setState(oldState => ({
                  formErrors: {
                    ...oldState.formErrors,
                    passwordError: response.error
                  },
                  isLoading: false
                }));
                errorsPresent = true;
              } else if (response.error.includes('username')) {
                this.setState(oldState => ({
                  formErrors: {
                    ...oldState.formErrors,
                    usernameError: response.error
                  },
                  isLoading: false
                }));
                errorsPresent = true;
              } else {
                this.setState({ internalError: true });
                this.toggleLoadingSpinner(this.state.isLoading);
              }
            });
          } else {
            errorsPresent = false;
            this.setState({
              first: '',
              last: '',
              email: '',
              username: '',
              password: '',
              formErrors: {}
            });
            this.fileInputRef.current.value = null;
            this.toggleLoadingSpinner(isLoading);
            window.location.hash = 'registration';
          }
        })
        .catch(err => {
          console.error('Fetch Failed!', err);
          this.setState({ networkError: true });
          this.toggleLoadingSpinner(isLoading);
        });
    }
  }

  render() {
    const {
      handleChange,
      handleSubmit,
      passwordMessage,
      errorMessage,
      state
    } = this;
    const { formErrors } = state;

    if (state.networkError) return <NetworkErrorPage />;
    if (state.internalError) {
      return (
        <Container
          className='reg-cont bg-white d-flex justify-content-center pt-md-5'
        >
          <Row className='login-heading-row'>
            <InternalErrorPage />
          </Row>
        </Container>
      );
    }

    return (
        <Container
          className='reg-cont bg-white d-flex justify-content-center pt-md-5'
        >
          <Col className='reg-form-col'>
            <h1 className='head-text pri-color text-center mt-4'>
              Create an Account
            </h1>

          <Form className='position-relative pb-4' onSubmit={ handleSubmit }>
            <Form.Label className='mt-2' htmlFor='first'>
              First Name
            </Form.Label>
            <Form.Control
              autoFocus
              required
              id='first'
              className='mb-1'
              type='text'
              name='first'
              value={ state.first }
              placeholder='Enter First Name'
              autoComplete='given-name'
              onChange={ handleChange }
              aria-describedby='firstErrorMessage'
            />
            { formErrors.firstError
              ? errorMessage(formErrors.firstError, 'firstErrorMessage')
              : null
            }

            <Form.Label className='mt-2' htmlFor='last'>
              Last Name
            </Form.Label>
            <Form.Control
              required
              id='last'
              className='mb-1'
              type='text'
              name='last'
              value={ state.last }
              placeholder='Enter Last Name'
              autoComplete='family-name'
              onChange={ handleChange }
              aria-describedby='lastErrorMessage'
            />
            { formErrors.lastError
              ? errorMessage(formErrors.lastError, 'lastErrorMessage')
              : null
            }

             <Form.Label className='mt-2' htmlFor='email'>
                Email
            </Form.Label>
            <Form.Control
              required
              id='email'
              type='email'
              name='email'
              value={ state.email }
              placeholder='Enter Email Address'
              autoComplete='email'
              onChange={ handleChange }
              aria-describedby='emailErrorMessage'
            />
            { formErrors.emailError
              ? errorMessage(formErrors.emailError, 'emailErrorMessage')
              : null
            }

            <Form.Label className='mt-2' htmlFor='username'>
              Username
            </Form.Label>
            <Form.Control
              required
              id='username'
              type='text'
              name='username'
              value={ state.username }
              placeholder='Enter Username'
              autoComplete='username'
              onChange={ handleChange }
              aria-describedby='usernameErrorMessage'
            />
            { formErrors.usernameError
              ? errorMessage(formErrors.usernameError, 'usernameErrorMessage')
              : null
            }

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
              accept='.png, .jpg, .jpeg, .webp'
              aria-describedby='imageErrorMessage'
            />
            { formErrors.imageError
              ? errorMessage(formErrors.imageError, 'imageErrorMessage')
              : null
            }

            <Form.Label className='mt-2' htmlFor='password'>
              Create Your Password
            </Form.Label>
            <Form.Control
              required
              id='password'
              type='password'
              name='password'
              value={ state.password }
              placeholder='Enter Password'
              autoComplete='new-password'
              onChange={ handleChange }
              aria-describedby='passwordHelpBlock passwordErrorMessage'
            />
            { passwordMessage(state.formErrors.passwordError) }

            <div
              className='login-form-actions d-flex justify-content-between pb-4'
            >
              <Button
              className='mt-4 mb-2'
              type='submit'
              disabled={ state.isLoading }
              >
                Submit
              </Button>
              <a
                href='#registration?form=sign-in'
                className='reg-form-links link pri-color my-2 '
              >
                Already signed up? Sign in
              </a>
            </div>
            { state.isLoading
              ? <div className='spin-absolute'><LoadingSpinner /></div>
              : null
            }
          </Form>

        </Col>
      </Container>
    );
  }
}
