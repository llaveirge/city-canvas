import React from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import LoadingSpinner from './loading-spinner';
import InternalErrorPage from '../pages/internal-error';
import NetworkErrorPage from '../pages/network-error';
import NewPinMap from './new-pin-map';
import AppContext from '../lib/app-context';
import { checkAlphanumeric } from '../lib';

export default class NewPinForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      artist: '',
      info: '',
      marker: {},
      isLoading: false,
      networkError: false,
      formErrors: {}
    };

    this.setMarker = this.setMarker.bind(this);
    this.errorMessage = this.errorMessage.bind(this);
    this.fileInputRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleLoadingSpinner = this.toggleLoadingSpinner.bind(this);
  }

  // Display form field error to user when field doesn't meet requirements
  errorMessage(message, idName) {
    if (message) {
      return (
        <Form.Text id={ idName } className='d-block warning'>
          { message }
        </Form.Text>
      );
    }
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
    const { title, artist, info, marker, isLoading, formErrors } = this.state;
    let errorsPresent = false;

    // clear any error messages from a previously failed form submission:
    if (formErrors) {
      this.setState({ formErrors: {} });
    }

    // check for empty fields and display error message to user where applicable:
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
    if (!this.fileInputRef.current.files[0]) {
      this.setState(oldState => ({
        formErrors: {
          ...oldState.formErrors,
          imageError: 'A Street Art Photo upload is required'
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
          mapError: 'Please pin a location on the map and try again.'
        },
        isLoading: false
      }));
      errorsPresent = true;
    }

    // if there are no form errors present, submit form data:
    if (!errorsPresent) {
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
              internalError: false,
              formErrors: {}
            });
            this.fileInputRef.current.value = null;
            this.toggleLoadingSpinner(isLoading);
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
    const { handleChange, handleSubmit, state, setMarker } = this;
    const { formErrors } = state;

    if (state.networkError) return <NetworkErrorPage />;
    if (state.internalError) return <InternalErrorPage />;

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
            aria-describedby='titleErrorMessage'
          />
          { formErrors.titleError ? this.errorMessage(formErrors.titleError, 'titleErrorMessage') : null }

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
          { formErrors.artistError ? this.errorMessage(formErrors.artistError, 'artistErrorMessage') : null }

          <Form.Label>Street Art Photo:</Form.Label>
          <Form.Control
            required
            id='image'
            type='file'
            name='image'
            ref={ this.fileInputRef }
            accept='.png, .jpg, .jpeg, .gif'
            aria-describedby='imageErrorMessage'
          />
          { formErrors.imageError ? this.errorMessage(formErrors.imageError, 'imageErrorMessage') : null }

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
           aria-describedby='infoErrorMessage'
          />
          { formErrors.infoError ? this.errorMessage(formErrors.infoError, 'infoErrorMessage') : null }

          <p className='form-label'>
            Click the map to drop a pin at the Street Art location:
          </p>
          <NewPinMap
            marker={ state.marker }
            setMarker={ setMarker }>
          </NewPinMap>
          { formErrors.mapError ? this.errorMessage(formErrors.mapError, 'mapErrorMessage') : null }

          <Button className='mt-3 mb-5' type='submit' disabled={ state.isLoading }>
            Submit
          </Button>
        { state.isLoading ? <div className='spin-absolute'> <LoadingSpinner /> </div> : null}
        </Form>
      </Container>
    );
  }
}

NewPinForm.contextType = AppContext;
