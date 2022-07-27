import React from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import UpdatePinMap from './update-pin-map';
import ModalDelete from './modal-deleted';
import ModalMarkedReported from './modal-marked-reported';
import InternalErrorPage from '../pages/internal-error';
import LoadingSpinner from './loading-spinner';

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
      showReported: '',
      isLoading: false,
      networkError: false
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
    this.toggleLoadingSpinner = this.toggleLoadingSpinner.bind(this);
    this.errorMessage = this.errorMessage.bind(this);
  }

  toggleLoadingSpinner(status) {
    const newStatus = !status;
    this.setState({ isLoading: newStatus });
  }

  componentDidMount() {
    this.toggleLoadingSpinner(this.state.isLoading);
    fetch(`/api/pins/${this.props.postId}`)
      .then(res => {
        if (res.ok) {
          res.json().then(pin => {
            this.setState({
              title: pin.title,
              artist: pin.artistName,
              info: pin.comment,
              marker: { lat: pin.lat, lng: pin.lng },
              postId: pin.postId,
              reported: pin.reported,
              deleted: pin.deleted,
              showReported: pin.reported
            });
            this.toggleLoadingSpinner(this.state.isLoading);
          });
        } else {
          this.setState({ internalError: true });
        }
      })
      .catch(err => {
        console.error('Fetch Failed!', err);
        this.setState({ networkError: true });
        this.toggleLoadingSpinner(this.state.isLoading);
      });
  }

  // Show Delete modal:
  handleShowDelete() {
    if (this.state.showReported) {
      this.handleCloseReported();
    }

    this.setState({ showDelete: true });
  }

  // Close Delete modal:
  handleCloseDelete() {
    this.setState({ showDelete: false });
  }

  // Show Reported modal:
  handleShowReported() {
    this.setState({ showReported: true });
  }

  // Close Reported modal
  handleCloseReported() {
    this.setState({ showReported: false });
  }

  deletePin() {
    event.preventDefault();
    const req = {
      method: 'PATCH'
    };
    this.toggleLoadingSpinner(this.state.isLoading);
    fetch(`/api/delete-pin/${this.props.postId}`, req)
      .then(res => {
        if (!res.ok) {
          res.json().then(response => {
            this.setState({ internalError: true });
          });
        } else {
          this.setState({
            title: '',
            artist: '',
            info: '',
            marker: {}
          });
          this.fileInputRef.current.value = null;
          this.toggleLoadingSpinner(this.state.isLoading);
          window.location.hash = 'my-canvas';
        }
      })
      .catch(err => {
        console.error('Fetch Failed!', err);
        this.setState({ networkError: true });
        this.toggleLoadingSpinner(this.state.isLoading);
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // Set marker coordinates for map:
  setMarker(marker) {
    this.setState({ marker });
  }

  errorMessage(message) {
    if (message) {
      return (
        <Form.Text id='errorMessage' className='d-block warning'>
          { message }
        </Form.Text>
      );
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { title, artist, info, marker, isLoading } = this.state;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('info', info);
    formData.append('lat', +marker.lat);
    formData.append('lng', +marker.lng);
    formData.append('userId', this.props.user);
    if (this.fileInputRef.current.value !== '') {
      formData.append('image', this.fileInputRef.current.files[0]);
    }

    const req = {
      method: 'PATCH',
      body: formData
    };
    this.toggleLoadingSpinner(isLoading);
    fetch(`/api/pins/${this.props.postId}`, req)
      .then(res => {
        if (res.ok) {
          res.json().then(response => {
            this.setState({
              title: '',
              artist: '',
              info: '',
              marker: {},
              isLoading: false
            });
            this.fileInputRef.current.value = null;
            window.location.hash = 'my-canvas';
          });
        } else {
          this.setState({ internalError: true });
        }
      })
      .catch(err => {
        console.error('Fetch Failed!', err);
        this.setState({ networkError: true });
        this.toggleLoadingSpinner(isLoading);
      });
  }

  render() {
    const {
      handleChange,
      handleSubmit,
      handleCloseReported,
      handleShowDelete,
      handleCloseDelete,
      deletePin,
      state
    } = this;

    if (state.networkError) {
      return (
        <h6 className='pt-5 px-5 saved-canvas-empty-heading pri-color text-center fw-bold'>
          Sorry, there was an error connecting to the network!
          Please check your internet connection and try again.
        </h6>
      );
    }

    if (state.internalError) {
      return <InternalErrorPage />;
    }

    return (
      <>
        {state.isLoading && !state.showDelete
          ? <LoadingSpinner />
          : <>
              <ModalMarkedReported
                show={ state.showReported }
                onHide={ handleCloseReported }
                showDelete={ handleShowDelete }/>

              <Container className = 'form-container px-0'>
                <Form className='position-relative pb-3' onSubmit={ handleSubmit }>
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
                  <UpdatePinMap
                    marker={ state.marker }
                    setMarker={ this.setMarker }>
                  </UpdatePinMap>

                  <Button className='mt-3 mb-5' type='submit' disabled={ state.isLoading }>
                    Submit
                  </Button>

                  <Button
                    className='mt-3 mb-5 warning-bk del float-end'
                    type='button'
                    onClick={ handleShowDelete }
                    disabled={ state.isLoading }>
                      Delete
                  </Button>
                </Form>
              </Container>

              <ModalDelete
                show={ state.showDelete }
                onHide={ handleCloseDelete }
                deletePin={ deletePin }
                isLoading={ state.isLoading }
            />
          </> }
      </>
    );
  }
}
