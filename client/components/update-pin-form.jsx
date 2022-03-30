import React from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import UpdatePinMap from './update-pin-map';
import ModalDelete from './modal-deleted';
import ModalMarkedReported from './modal-marked-reported';

export default class UpdatePinForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      artist: '',
      info: '',
      marker: {},
      postId: '',
      reported: '',
      showDelete: false,
      showReported: ''
    };

    this.setMarker = this.setMarker.bind(this);
    this.fileInputRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseDelete = this.handleCloseDelete.bind(this);
    this.handleShowDelete = this.handleShowDelete.bind(this);
    this.deletePin = this.deletePin.bind(this);
    this.handleShowReported = this.handleShowReported.bind(this);
    this.handleCloseReported = this.handleCloseReported.bind(this);
    this.removeReported = this.removeReported.bind(this);
  }

  componentDidMount() {
    fetch(`/api/pins/${this.props.postId}`)
      .then(res => res.json())
      .then(pin => this.setState({
        title: pin.title,
        artist: pin.artistName,
        info: pin.comment,
        marker: { lat: pin.lat, lng: pin.lng },
        postId: pin.postId,
        reported: pin.reported,
        deleted: pin.deleted,
        showReported: pin.reported
      }));
  }

  // Show Delete modal:
  handleShowDelete() {
    if (this.state.showReported === true) {
      this.handleCloseReported();
    }

    this.setState({ showDelete: true });
  }

  // Close Delete modal:
  handleCloseDelete() {
    this.setState({ showDelete: false });
  }

  // Show Reported Modal:
  handleShowReported() {
    this.setState({ showReported: true });
  }

  handleCloseReported() {
    this.setState({ showReported: false });
  }

  removeReported() {
    const req = {
      method: 'PATCH'
    };
    fetch(`api/remove-reported/${this.postId}`, req)
      .then(res => res.json())
      .then(response =>
        this.setState({
          reported: false,
          showReported: false
        }))
      .catch(err => console.error('Fetch Failed!', err));
  }

  deletePin() {
    event.preventDefault();
    const req = {
      method: 'PATCH'
    };
    fetch(`/api/delete-pin/${this.props.postId}`, req)
      .then(res => res.json())
      .then(response => {
        this.setState({
          title: '',
          artist: '',
          info: '',
          marker: {}
        });
        this.fileInputRef.current.value = null;
        window.location.hash = 'my-canvas';
      })
      .catch(err => console.error('Fetch Failed!', err));
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // Set marker coordinates for map:
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
          marker: {}
        });
        this.fileInputRef.current.value = null;
        window.location.hash = 'my-canvas';
      })
      .catch(err => console.error('Fetch Failed!', err));
  }

  render() {
    const { handleChange, handleSubmit } = this;
    return (
      <>
        <ModalMarkedReported
          show={ this.state.showReported }
          onHide={ this.handleCloseReported }
          showDelete={ this.handleShowDelete }/>

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
              setMarker={ this.setMarker }>
            </UpdatePinMap>
            <Button className='mt-3 mb-5' type='submit'>
              Submit
            </Button>
            <Button
              className='mt-3 mb-5 warning-bk del float-end'
              type='button'
              onClick={ this.handleShowDelete }>
                Delete
            </Button>
          </Form>
        </Container>

        <ModalDelete
          show={ this.state.showDelete }
          onHide={ this.handleCloseDelete }
          deletePin={ this.deletePin }
        />
      </>
    );
  }
}
