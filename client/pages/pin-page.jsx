import React from 'react';
import { Container, Col, Image, Row, Card } from 'react-bootstrap';
import ModalReport from '../components/modal-report';
import LoadingSpinner from '../components/loading-spinner';
import InternalErrorPage from './internal-error';
import NetworkErrorPage from './network-error';
import Redirect from '../components/redirect';
import { AppContext } from '../lib';
import SavingSpinner from '../components/saving-spinner';

export default class PinPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pin: {},
      show: false,
      isLoading: false,
      networkError: false,
      isSaving: false
    };

    this.toggleSaved = this.toggleSaved.bind(this);
    this.reportPin = this.reportPin.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.toggleLoadingSpinner = this.toggleLoadingSpinner.bind(this);
    this.toggleSaving = this.toggleSaving.bind(this);
  }

  toggleLoadingSpinner(status) {
    const newStatus = !status;
    this.setState({ isLoading: newStatus });
  }

  toggleSaving(status) {
    const newStatus = !status;
    this.setState({ isSaving: newStatus });
  }

  componentDidMount() {
    const { user } = this.context;
    if (user) {
      this.toggleLoadingSpinner(this.state.isLoading);
      fetch(`/api/pins/${this.props.postId}/${user.userId}`)
        .then(res => {
          if (res.ok) {
            res.json().then(pin => {
              this.setState({ pin });
              this.toggleLoadingSpinner(this.state.isLoading);
            });
          } else {
            res.json().then(response => {
              console.error(response.error);
              if (response.error.includes('postId')) {
                this.setState({ postIdError: true });
                this.toggleLoadingSpinner(this.state.isLoading);
              } else {
                this.setState({ internalError: true });
                this.toggleLoadingSpinner(this.state.isLoading);
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
  }

  toggleSaved() {
    event.preventDefault();
    const { user } = this.context;
    const { pin, isSaving } = this.state;

    // Save pin:
    if (pin.savedByCurrentUser === null) {
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      };
      this.toggleSaving(isSaving);
      fetch(`/api/save-post/${this.props.postId}`, req)
        .then(res => {
          if (res.ok) {
            res.json().then(savedPost => {
              const updatedPin = pin;
              updatedPin.savedByCurrentUser = savedPost.createdAt;
              this.setState({ pin: updatedPin });
              this.toggleSaving(this.state.isSaving);
            });
          } else {
            res.json().then(response => {
              console.error(response.error);
              if (response.error.includes('postId')) {
                this.setState({ postIdError: true });
                this.toggleSaving(this.state.isSaving);
              } else if (response.error.includes('userId')) {
                this.setState({ userIdError: true });
                this.toggleSaving(this.state.isSaving);
              } else {
                this.setState({ internalError: true });
                this.toggleSaving(this.state.isSaving);
              }
            });
          }
        })
        .catch(err => {
          console.error('Fetch Failed!', err);
          this.setState({ networkError: true });
          this.toggleSaving(this.state.isSaving);
        });
    } else if (pin.savedByCurrentUser) {
      // Delete from saved:
      const req = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      };
      this.toggleSaving(isSaving);
      fetch(`/api/delete-saved/${this.props.postId}`, req)
        .then(res => {
          if (res.ok) {
            res.text().then(deletedPin => {
              const updatedPin = pin;
              updatedPin.savedByCurrentUser = null;
              this.setState({ pin: updatedPin });
              this.toggleSaving(this.state.isSaving);
            });
          } else {
            res.json().then(response => {
              console.error(response.error);
              if (response.error.includes('postId')) {
                this.setState({ postIdError: true });
                this.toggleSaving(this.state.isSaving);
              } else if (response.error.includes('userId')) {
                this.setState({ userIdError: true });
                this.toggleSaving(this.state.isSaving);
              } else {
                this.setState({ internalError: true });
                this.toggleSaving(this.state.isSaving);
              }
            });
          }
        })
        .catch(err => {
          console.error('Fetch Failed!', err);
          this.setState({ networkError: true });
          this.toggleLoadingSpinner(this.state.isSaving);
        });
    }
  }

  reportPin() {
    event.preventDefault();
    const req = {
      method: 'PATCH'
    };
    this.toggleLoadingSpinner(this.state.isLoading);
    fetch(`/api/report/${this.props.postId}`, req)
      .then(res => {
        if (res.ok) {
          res.json().then(reported => {
            const updatedPin = this.state.pin;
            updatedPin.reported = true;
            this.setState({ pin: updatedPin });
            this.toggleLoadingSpinner(this.state.isLoading);
            this.handleClose();
          });
        } else {
          res.json().then(response => {
            console.error(response.error);
            if (response.error.includes('postId')) {
              this.setState({ postIdError: true });
              this.toggleLoadingSpinner(this.state.isLoading);
            } else {
              this.setState({ internalError: true });
              this.toggleLoadingSpinner(this.state.isLoading);
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

  // Show modal:
  handleShow() {
    this.setState({ show: true });
  }

  // Close modal:
  handleClose() {
    this.setState({ show: false });
  }

  render() {
    const { pin, isLoading, show, networkError, internalError, postIdError, userIdError, isSaving } = this.state;
    const { user } = this.context;

    if (!user) return <Redirect to='registration' />;
    if (internalError) return <InternalErrorPage />;
    if (networkError) return <NetworkErrorPage />;

    if (postIdError) {
      return (
        <Container>
          <Row className='text-center'>
            <h2 className='mt-5 display-3 pri-color fw-bold'>City Canvas Pin Error</h2>
          </Row>
          <Row className='text-center'>
            <p className='pt-4 px-4 fw-bold error-text no-results-heading'>
              We can&apos;t seem to find the pin you&apos;re looking for. The pin may have been removed or potentially never existed in the first place!
            <br />
            <br />
              <a href='#' className='sec-color fw-bold no-decoration'>
                Return to the City Canvas home page
              </a>
            </p>
          </Row>
        </Container>
      );
    }

    if (userIdError) {
      return (
        <Container>
          <Row className='text-center'>
            <h2 className='mt-5 display-3 pri-color fw-bold'>User Account Error</h2>
          </Row>
          <Row className='text-center'>
            <p className='pt-4 px-4 fw-bold error-text no-results-heading'>
              An account error has occurred. Please sign out and sign in again, or <a href='#registration' className='sec-color no-decoration'>create an account</a>.
            <br />
            <br />
              <a href='#registration' className='sec-color fw-bold no-decoration'>
                Return to the City Canvas Registration Page
              </a>
            </p>
          </Row>
        </Container>
      );
    }

    if (isLoading && !show) {
      return (
      <div className='pt-5'><LoadingSpinner /></div>
      );
    }

    return (
      <>
        <Container className='d-flex pt-sm-5 pt-3 align-items-center pin-cont'>
          <Image
            className='profile-pic sec-bk-color'
            src={ pin.photoUrl }
          ></Image>
          <p className='feature-font-sm mb-0 ms-3'>{ pin.userName }</p>
        </Container>

        <Container className='mt-4 pin-cont'>
          <Card className='flex-sm-row'>
            <Col>
              <Card.Img className='full-pin-img' src={ pin.artPhotoUrl } />
            </Col>
            <Col className='custom-basis'>
              <Card.Body>
                <Card.Title
                  as='h4'
                  className={
                    `head-text pri-color py-2 ${pin.reported
                      ? 'me-5 pe-1'
                      : ''}`
                  }
                >
                  { pin.reported
                    ? <span className='align-top warning absolute-right'>
                        <i className='fas fa-exclamation fa-sm'></i>
                        <i className='ms-1 fas fa-eye-slash fa-sm'></i>
                      </span>
                    : null }
                  { pin.title }
                </Card.Title>
                  <Card.Text className='fw-bold pri-color pb-sm-1'>
                    Artist: { pin.artistName }
                  </Card.Text>
                  <Card.Link
                    href={
                      `#pin-map?pinId=${pin.postId}&lat=${pin.lat}&lng=${pin.lng}&img=${encodeURIComponent(pin.artPhotoUrl)}`
                    }
                    className='fw-bold sec-color feature-font no-decoration'
                  >
                    <i className='me-2 fas fa-map-marker-alt fa-lg'></i>
                    On The Map
                  </Card.Link>
                  <Card.Text className='pt-4 pb-5'>
                    { pin.comment }
                  </Card.Text>
                  { !pin.reported
                    ? <Card.Link
                        role='button'
                        className={ !isSaving ? 'ab-bottom grey report me-5' : 'ab-bottom grey report me-s pe-none'}
                        tabIndex={ !isSaving ? '0' : '-1'}
                        aria-disabled={ isSaving }
                        onClick={ !isSaving ? this.handleShow : null }>
                          Report as removed from view
                      </Card.Link>
                    : <Card.Text className='ab-bottom warning report mb-0 me-5 pe-1'>
                        Reported as removed from view
                      </Card.Text>
                  }
                  { !isSaving
                    ? <Card.Link className='bg-white ab-bottom-right'>
                        <i className={ pin.savedByCurrentUser === null
                          ? 'grey not-saved fas fa-heart fa-lg'
                          : 'sec-color saved fas fa-heart fa-lg' }
                          onClick={ this.toggleSaved }></i>
                      </Card.Link>
                    : <Card.Link className='ab-bottom-right'>
                        <SavingSpinner />
                      </Card.Link>
                    }
              </Card.Body>
            </Col>
          </Card>
        </Container>

        <ModalReport
          show={ show }
          onHide={ this.handleClose }
          report={ this.reportPin }
          isLoading={ isLoading }
        />
      </>
    );
  }
}

PinPage.contextType = AppContext;
