import React from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import UpdatePinMap from './update-pin-map';
import ModalDelete from './modal-deleted';
import ModalMarkedReported from './modal-marked-reported';
import InternalErrorPage from '../pages/internal-error';
import NotFound from '../pages/not-found';
import NetworkErrorPage from '../pages/network-error';
import LoadingSpinner from './loading-spinner';
import { checkAlphanumeric, AppContext } from '../lib';

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
      networkError: false,
      error: '',
      formErrors: {}
    };

    this.toggleLoadingSpinner = this.toggleLoadingSpinner.bind(this);
    this.handleShowReported = this.handleShowReported.bind(this);
    this.handleCloseReported = this.handleCloseReported.bind(this);
    this.handleCloseDelete = this.handleCloseDelete.bind(this);
    this.handleShowDelete = this.handleShowDelete.bind(this);
    this.deletePin = this.deletePin.bind(this);
    this.errorMessage = this.errorMessage.bind(this);
    this.fileInputRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.setMarker = this.setMarker.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleLoadingSpinner(status) {
    const newStatus = !status;
    this.setState({ isLoading: newStatus });
  }

  componentDidMount() {
    this.toggleLoadingSpinner(this.state.isLoading);
    const { user } = this.context;

    fetch(`/api/pins/${this.props.postId}/${user.userId}`)
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
        } else if (!res.ok) {
          res.json().then(response => {
            console.error(response.error);
            if (response.error.includes('looking')) {
              this.setState({ errorNotFound: 404, isLoading: false });
            } else {
              this.setState({ internalError: true, isLoading: false });
            }
          });
        }
      })
      .catch(err => {
        console.error('Fetch Failed!', err);
        this.setState({ networkError: true });
        this.toggleLoadingSpinner(this.state.isLoading);
      });
  }

  // Show Reported modal:
  handleShowReported() {
    this.setState({ showReported: true });
  }

  // Close Reported modal
  handleCloseReported() {
    this.setState({ showReported: false });
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

  // Set marker coordinates for map:
  setMarker(marker) {
    this.setState({ marker });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { title, artist, info, marker, isLoading, formErrors } = this.state;
    let errorsPresent = false;

    // Clear any error messages from a previously failed form submission:
    if (formErrors) {
      this.setState({ formErrors: {} });
    }

    // Check for empty fields and display error message where applicable:
    if (!title || !checkAlphanumeric(title)) {
      this.setState(oldState => ({
        formErrors: {
          ...oldState.formErrors,
          titleError: 'Street Art Title is a required field'
        },
        isLoading: false
      }));
      errorsPresent = true;
    }
    if (!artist || !checkAlphanumeric(artist)) {
      this.setState(oldState => ({
        formErrors: {
          ...oldState.formErrors,
          artistError: 'Artist Name or Tag is a required field'
        },
        isLoading: false
      }));
      errorsPresent = true;
    }
    if (!info || !checkAlphanumeric(info)) {
      this.setState(oldState => ({
        formErrors: {
          ...oldState.formErrors,
          infoError: 'Description or information about City Canvas pin is required'
        },
        isLoading: false
      }));
      errorsPresent = true;
    }
    if (!('lat' in marker) || !('lng' in marker)) {
      this.setState(oldState => ({
        formErrors: {
          ...oldState.formErrors,
          mapError: 'Please pin a location on the map and try again'
        },
        isLoading: false
      }));
      errorsPresent = true;
    }

    // If there are no form errors present, submit form data:
    if (!errorsPresent) {
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
          if (!res.ok) {
            res.json().then(response => {
              console.error(response.error);
              this.setState({ internalError: true, isLoading: false });
            });
          } else {
            this.setState({
              title: '',
              artist: '',
              info: '',
              marker: {},
              isLoading: false,
              formErrors: {}
            });
            this.fileInputRef.current.value = null;
            window.location.hash = 'my-canvas';
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
      handleCloseReported,
      handleShowDelete,
      handleCloseDelete,
      deletePin,
      errorMessage,
      state
    } = this;
    const { formErrors } = state;

    if (state.networkError) return <NetworkErrorPage />;
    if (state.internalError) return <InternalErrorPage />;
    if (state.errorNotFound === 404) return <NotFound />;
    if (state.isLoading && !state.showDelete) return <LoadingSpinner />;

    return (
      <>
        <ModalMarkedReported
          show={ state.showReported }
          onHide={ handleCloseReported }
          showDelete={ handleShowDelete }
        />

        <Container className = 'form-container px-0'>
          <Form className='position-relative pb-3' onSubmit={ handleSubmit }>
            <Form.Label className='mt-2' htmlFor='title'>
              Street Art Title:
            </Form.Label>
            <Form.Control
              autoFocus
              required
              id='title'
              type='text'
              name='title'
              value={ state.title }
              placeholder='Enter Title, or "Unknown"'
              onChange={ handleChange }
              aria-describedby='titleErrorMessage'
            />
            { formErrors.titleError
              ? errorMessage(formErrors.titleError, 'titleErrorMessage')
              : null
            }

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
              aria-describedby='artistErrorMessage'
            />
            { formErrors.artistError
              ? errorMessage(formErrors.artistError, 'artistErrorMessage')
              : null
            }

            <Form.Label>Street Art Photo:</Form.Label>
            <Form.Control
              id='image'
              type='file'
              name='image'
              ref={ this.fileInputRef }
              accept='.png, .jpg, .jpeg, .webp'
            />

            <Form.Label htmlFor='info'>
              Description or Information:
            </Form.Label>
            <Form.Control
              required
              id='info'
              as='textarea'
              name='info'
              value={ state.info }
              rows={ 4 }
              placeholder='Add some information about this pin...'
              onChange={ handleChange }
              aria-describedby='infoErrorMessage'
            />
            { formErrors.infoError
              ? errorMessage(formErrors.infoError, 'infoErrorMessage')
              : null
            }

            <p className='form-label'>
              Click the map to drop a pin at the street art location:
            </p>
            <UpdatePinMap marker={ state.marker } setMarker={ this.setMarker }>
            </UpdatePinMap>
            { formErrors.mapError
              ? errorMessage(formErrors.mapError, 'mapErrorMessage')
              : null
            }

            <Button
            className='mt-3 mb-5'
            type='submit'
            disabled={ state.isLoading }
            >
              Submit
            </Button>

            <Button
              className='del warning-bk float-end mt-3 mb-5'
              type='button'
              onClick={ handleShowDelete }
              disabled={ state.isLoading }
            >
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
      </>
    );
  }
}

UpdatePinForm.contextType = AppContext;
