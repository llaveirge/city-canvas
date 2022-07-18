import React from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import LoadingSpinner from './loading-spinner';
import NewPinMap from './new-pin-map';
import AppContext from '../lib/app-context';

export default class NewPinForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      artist: '',
      info: '',
      marker: {},
      isLoading: false
    };

    this.setMarker = this.setMarker.bind(this);
    this.fileInputRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  setMarker(marker) {
    this.setState({ marker });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { title, artist, info, marker, isLoading } = this.state;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('info', info);
    formData.append('lat', marker.lat);
    formData.append('lng', marker.lng);
    formData.append('image', this.fileInputRef.current.files[0]);
    formData.append('userId', this.props.user);

    const req = {
      method: 'POST',
      body: formData
    };
    this.toggleLoadingSpinner(isLoading);
    fetch('/api/post-pin', req)
      .then(res => res.json())
      .then(response => {
        this.setState({
          title: '',
          artist: '',
          info: '',
          marker: {},
          error: ''
        });
        this.fileInputRef.current.value = null;
        this.toggleLoadingSpinner(isLoading);
        window.location.hash = 'my-canvas';
      })
      .catch(err => {
        console.error('Fetch Failed!', err);
        this.toggleLoadingSpinner(isLoading);
      });
  }

  render() {
    const { handleChange, handleSubmit, state, setMarker } = this;

    return (
      <Container className='form-container px-0'>

        <Form className='position-relative  pb-2' onSubmit={ handleSubmit }>
          <Form.Label className='mt-2' htmlFor='title'>
            Street Art Title:
          </Form.Label>
          <Form.Control
            required
            autoFocus
            id='title'
            type='text'
            name='title'
            value={ state.title }
            placeholder='Enter Title, or "Unknown"'
            onChange={ handleChange }
          />

          <Form.Label htmlFor='artist'>
            Artist Name or Tag:
          </Form.Label>
          <Form.Control
            required
            id='artist'
            type='text'
            name='artist'
            value={ state.artist }
            placeholder='Enter Artist Name or Tag, or "Unknown"'
            onChange={ handleChange }
          />

          <Form.Label>Street Art Photo:</Form.Label>
          <Form.Control
            required
            id='image'
            type='file'
            name='image'
            ref={ this.fileInputRef }
            accept='.png, .jpg, .jpeg, .gif'
          />

          <Form.Label htmlFor='info'>
            Description or Information:
          </Form.Label>
          <Form.Control
            as='textarea'
            rows={ 4 }
            required
            id='info'
            name='info'
            value={ state.info }
            placeholder='Add some information about this pin...'
            onChange={ handleChange }
          />

          <p className='form-label'>
            Click the map to drop a pin at the Street Art location:
          </p>
          <NewPinMap
            marker={ state.marker }
            setMarker={ setMarker }>
          </NewPinMap>

          <Button className='mt-3 mb-5' type='submit' disabled={ state.isLoading }>
            Submit
          </Button>
        { state.isLoading ? <div className='absolute'> <LoadingSpinner /> </div> : null}
        </Form>
      </Container>
    );
  }
}

NewPinForm.contextType = AppContext;
