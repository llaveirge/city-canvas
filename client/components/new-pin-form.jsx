import React from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import NewPinMap from './new-pin-map';

export default class NewPinForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      artist: '',
      info: '',
      marker: {}
    };

    this.setMarker = this.setMarker.bind(this);
    this.fileInputRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  setMarker(marker) {
    this.setState({ marker });
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
        this.setState({
          title: '',
          artist: '',
          info: '',
          lat: 42.3594411,
          lng: -71.080346
        });
        this.fileInputRef.current.value = null;
        window.location.hash = 'myCanvas';
      })
      .catch(err => console.error('Fetch Failed!', err));
  }

  render() {
    const { handleChange, handleSubmit } = this;

    return (
      <Container className = "form-container px-0">
        <Form onSubmit={handleSubmit}>
          <Form.Label className="mt-2" htmlFor='title'>
            Street Art Title:
          </Form.Label>
          <Form.Control
            required
            autoFocus
            id='title'
            type='text'
            name='title'
            value={this.state.title}
            placeholder='Enter Title'
            onChange={handleChange}
          />
          <Form.Label htmlFor='artist'>
            Artist Name or Tag:
          </Form.Label>
          <Form.Control
            required
            id='artist'
            type='text'
            name='artist'
            value={this.state.artist}
            placeholder='Enter Artist Name or Tag'
            onChange={handleChange}
          />
          <Form.Label>Street Art Photo:</Form.Label>
          <Form.Control
            required
            id='image'
            type='file'
            name='image'
            ref={this.fileInputRef}
            accept=".png, .jpg, .jpeg, .gif"
          />
          <Form.Label htmlFor='info'>
            Description or Information:
          </Form.Label>
          <Form.Control
            className='mb-3'
            as="textarea"
            rows={4}
            required
            id='info'
            name='info'
            value={this.state.info}
            placeholder='Add some information about this pin...'
            onChange={handleChange}
          />
          <NewPinMap marker={this.state.marker} setMarker={this.setMarker}></NewPinMap>
          <Button className="mt-3"type='submit'>
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}
