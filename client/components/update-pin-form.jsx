import React from 'react';
import { Container, Button, Form, Modal } from 'react-bootstrap';
import UpdatePinMap from './update-pin-map';

export default class UpdatePinForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      artist: '',
      info: '',
      marker: {},
      center: {},
      postId: '',
      reported: false,
      show: false
    };

    this.setMarker = this.setMarker.bind(this);
    this.fileInputRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);

  }

  componentDidMount() {
    fetch(`api/pins/${this.props.postId}`)
      .then(res => res.json())
      .then(pin => this.setState({
        title: pin.title,
        artist: pin.artistName,
        info: pin.comment,
        marker: { lat: pin.lat, lng: pin.lng },
        center: { lat: pin.lat, lng: pin.lng },
        postId: pin.postId,
        reported: pin.reported
      }));
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
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
    const { title, artist, info, marker } = this.state;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('info', info);
    formData.append('lat', +marker.lat);
    formData.append('lng', +marker.lng);
    if (this.fileInputRef.current.value !== '') {
      formData.append('image', this.fileInputRef.current.files[0]);
    }

    const req = {
      method: 'PATCH',
      body: formData
    };
    fetch(`/api/pins/${this.props.postId}`, req)
      .then(res => res.json())
      .then(response => {
        this.setState({
          title: '',
          artist: '',
          info: '',
          marker: {},
          center: {}
        });
        this.fileInputRef.current.value = null;
        window.location.hash = 'myCanvas';
      })
      .catch(err => console.error('Fetch Failed!', err));
  }

  render() {
    const { handleChange, handleSubmit } = this;
    return (
      <>
        <Container className = 'form-container px-0'>
          <Form onSubmit={ handleSubmit }>
            <Form.Label className='mt-2' htmlFor='title'>
              Street Art Title:
            </Form.Label>
            <Form.Control
              required
              autoFocus
              id='title'
              type='text'
              name='title'
              value={ this.state.title }
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
              value={ this.state.artist }
              placeholder='Enter Artist Name or Tag, or "Unknown"'
              onChange={ handleChange }
            />
            <Form.Label>Street Art Photo:</Form.Label>
            <Form.Control
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
              value={ this.state.info }
              placeholder='Add some information about this pin...'
              onChange={ handleChange }
            />
            <p className='form-label'>
              Click the map to drop a pin at the Street Art location:
            </p>
            <UpdatePinMap
              marker={ this.state.marker }
              setMarker={ this.setMarker }
              center={ this.state.center }>
            </UpdatePinMap>
            <Button className='mt-3 mb-5' type='submit'>
              Submit
            </Button>
            <Button className='mt-3 mb-5 del' type='button' onClick={this.handleShow}>
              Delete
            </Button>
          </Form>
        </Container>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete This City Canvas Pin</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this City Canvas pin?
          </Modal.Body>
          <Modal.Footer>
            <Button className='cancel' onClick={this.handleClose}>
              Cancel
            </Button>
            <Button className='del'>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
