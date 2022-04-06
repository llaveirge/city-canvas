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
      password: '',
      passwordError: '',
      usernameError: '',
      emailError: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.fileInputRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('/api/users/usernames')
      .then(res => res.json())
      .then(usernames => {
        const users = [];
        for (const obj of usernames) {
          for (const key in obj) {
            users.push(obj[key]);
          }
        }

        this.setState({
          existingUsernames: users
        });
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { first, last, email, username, password } = this.state;

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
    fetch('/api/auth/sign-up', req)
      .then(res => {
        if (!res.ok) {
          res.json().then(response => {
            if (response.error.includes('username')) {
              this.setState({ usernameError: response.error });
            } else if (response.error.includes('email')) {
              this.setState({ emailError: response.error });
            } else if (response.error.includes('password')) {
              this.setState({ passwordError: response.error });
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
            existingUsernames: [],
            usernameError: ''
          });
          this.fileInputRef.current.value = null;
        }
      })
      .catch(err => console.error('Fetch Has Failed!', err));
  }

  render() {
    const { handleChange, handleSubmit } = this;

    return (
        <Container className='cont-registration bg-white d-flex justify-content-center pt-md-5'>
          <Col className='reg-form-col'>
            <h1 className='head-text pri-color text-center mt-4'>
                Create an Account
            </h1>
          <Form onSubmit={ handleSubmit }>
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
              value={ this.state.first }
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
              value={ this.state.last }
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
              value={ this.state.email }
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
              value={ this.state.username }
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
              value={ this.state.password }
              onChange={ handleChange }
            />
            <Form.Text className="text-muted">
              Password must include at least six characters and one number.
            </Form.Text>
            <br />
            <Button className='mt-4 mb-2' type='submit'>
              Submit
            </Button>
        </Form>
        </Col>
      </Container>
    );
  }
}
