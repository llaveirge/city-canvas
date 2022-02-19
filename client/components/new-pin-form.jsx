import React from 'react';
import { Row, Button } from 'react-bootstrap';

export default class NewPinForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      artist: '',
      info: '',
      lat: 42.3594411,
      lng: -71.080346
    };

    this.fileInputRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { title, artist, info, lat, lng } = this.state;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('info', info);
    formData.append('lat', lat);
    formData.append('lng', lng);
    formData.append('image', this.fileInputRef.current.files[0]);

    const req = {
      method: 'POST',
      body: formData
    };
    fetch('/api/post-pin', req)
      .then(res => res.json())
      .then(response => {
        // console.log('From form, response body:', response);
        this.setState({
          title: '',
          artist: '',
          info: '',
          lat: 42.3594411,
          lng: -71.080346,
          image: 'here'
        });
        this.fileInputRef.current.value = null;
      })
      .catch(err => console.error('Fetch Failed!', err));
  }

  render() {
    const { handleChange, handleSubmit } = this;

    return (
      <form onSubmit={handleSubmit}>
        <Row>
        <label htmlFor='title'>
          Street Art Title:
        </label>
        <input
          required
          autoFocus
          id='title'
          type='text'
          name='title'
          placeholder='Enter Title'
          onChange={handleChange}
        />
        </Row>
        <Row>
         <label htmlFor='artist'>
          Artist Name or Tag:
        </label>
        <input
          required
          autoFocus
          id='artist'
          type='text'
          name='artist'
          placeholder='Enter Artist Name or Tag'
          onChange={handleChange}
        />
        </Row>
        <Row>
         <label htmlFor='image'>
          Artist Name or Tag:
        </label>
        <input
          required
          autoFocus
          id='image'
          type='file'
          name='image'
          ref={this.fileInputRef}
          accept=".png, .jpg, .jpeg, .gif"
          onChange={handleChange}
        />
        </Row>
          <Row>
         <label htmlFor='info'>
          Description or Information:
        </label>
        <textarea
          required
          autoFocus
          id='info'
          name='info'
          placeholder='Add some information about this pin...'
          onChange={handleChange}
        />
        </Row>
        <Row>
          <Button type='submit'>
            Submit
          </Button>
        </Row>

      </form>
    );
  }

}
