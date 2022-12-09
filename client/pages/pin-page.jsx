import React from 'react';
import {
  Container,
  Col,
  Image,
  Row,
  Card,
  Tooltip,
  OverlayTrigger
} from 'react-bootstrap';
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

    this.toggleLoadingSpinner = this.toggleLoadingSpinner.bind(this);
    this.toggleSaving = this.toggleSaving.bind(this);
    this.toggleSaved = this.toggleSaved.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.reportPin = this.reportPin.bind(this);
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

  toggleLoadingSpinner(status) {
    const newStatus = !status;
    this.setState({ isLoading: newStatus });
  }

  toggleSaving(status) {
    const newStatus = !status;
    this.setState({ isSaving: newStatus });
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

  // Report modal:
  handleShow() {
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
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

  render() {
    const {
      pin,
      isLoading,
      show,
      networkError,
      internalError,
      postIdError,
      userIdError,
      isSaving
    } = this.state;
    const { user } = this.context;

    if (!user) return <Redirect to='registration' />;
    if (internalError) return <InternalErrorPage />;
    if (networkError) return <NetworkErrorPage />;

    if (postIdError) {
      return (
        <Container>
          <Row className='text-center'>
            <h2 className='pri-color display-3 fw-bold mt-5'>
              City Canvas Pin Error
            </h2>
          </Row>
          <Row className='text-center'>
            <p className='msg-font lh-base fw-bold pt-4 px-4'>
              We can&apos;t seem to find the pin you&apos;re looking for. The
              pin may have been removed or not yet created!
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
            <h2 className='pri-color display-3 fw-bold mt-5'>
              User Account Error
            </h2>
          </Row>
          <Row className='text-center'>
            <p className='msg-font lh-base fw-bold pt-4 px-4'>
              An account error has occurred. Please sign out and sign in again,
              or&nbsp;
              <a href='#registration' className='sec-color no-decoration'>
                create an account
              </a>.
            <br />
            <br />
              <a
                href='#registration'
                className='sec-color fw-bold no-decoration'
              >
                Return to the City Canvas Registration Page
              </a>
            </p>
          </Row>
        </Container>
      );
    }

    if (isLoading && !show) {
      return <div className='pt-5'><LoadingSpinner /></div>;
    }

    return (
      <>
        <Container className='pin-cont d-flex align-items-center pt-sm-5 pt-3'>
          <Image
            className='profile-pic sec-bk-color'
            src={ pin.photoUrl }
          ></Image>
          <p className='fs-5-5-sm mb-0 ms-3'>{ pin.username }</p>
        </Container>

        <Container className=' pin-cont mt-4'>
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
                    ? <span className='warning absolute-right align-top'>
                        <i className='fas fa-exclamation fa-sm'></i>
                        <i className='fas fa-eye-slash fa-sm ms-1'></i>
                      </span>
                    : null
                  }
                  { pin.title }
                </Card.Title>
                  <Card.Text className='pri-color fw-bold pb-sm-1'>
                    Artist: { pin.artistName }
                  </Card.Text>
                  <Card.Link
                    href={
                      `#pin-map?pinId=${pin.postId}&lat=${pin.lat}&lng=${
                        pin.lng}&img=${encodeURIComponent(pin.artPhotoUrl)}`
                    }
                    className='sec-color fs-5-5 no-decoration fw-bold'
                  >
                    <i className='fas fa-map-marker-alt fa-lg me-2'></i>
                    On The Map
                  </Card.Link>
                  <Card.Text className='pt-4 pb-5'>
                    { pin.comment }
                  </Card.Text>

                  { !pin.reported
                    ? <Card.Link
                        role='button'
                        className={
                          !isSaving
                            ? 'ab-bottom grey report-text me-5'
                            : 'ab-bottom grey report-text pe-none me-5'}
                        tabIndex={ !isSaving ? '0' : '-1'}
                        aria-disabled={ isSaving }
                        onClick={ !isSaving ? this.handleShow : null }>
                          Report as removed from view
                      </Card.Link>
                    : <Card.Text
                      className='ab-bottom report-text warning mb-0 me-5 pe-1'
                      >
                        Reported as removed from view
                      </Card.Text>
                  }

                  { !isSaving
                    ? <Card.Link
                        role='button'
                        as='button'
                        type='button'
                        className='save-button p-0 bg-white ab-bottom-right'>
                          <OverlayTrigger
                            placement='top'
                            delay={{ show: 450 }}
                            overlay={
                              <Tooltip id='save-pin-tooltip'>
                              { !pin.savedByCurrentUser
                                ? 'Save pin'
                                : 'Remove save'}
                              </Tooltip>
                            }
                          >
                            <i className={ pin.savedByCurrentUser === null
                              ? 'grey not-saved fas fa-heart fa-lg'
                              : 'sec-color saved fas fa-heart fa-lg' }
                              onClick={ this.toggleSaved }></i>
                          </OverlayTrigger>
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
