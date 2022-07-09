import React from 'react';
import { Container, Col, Image, Card } from 'react-bootstrap';
import ModalReport from '../components/modal-report';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';

export default class PinPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pin: {},
      show: false
    };

    this.toggleSaved = this.toggleSaved.bind(this);
    this.reportPin = this.reportPin.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

  }

  componentDidMount() {
    const { user } = this.context;
    if (user) {
      fetch(`/api/pins/${this.props.postId}`)
        .then(res => res.json())
        .then(pin => this.setState({ pin }));
    }
  }

  toggleSaved() {
    event.preventDefault();
    const { user } = this.context;
    const { pin } = this.state;

    // Save pin:
    if (pin.saved === null) {
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      };
      fetch(`/api/save-post/${this.props.postId}`, req)
        .then(res => res.json())
        .then(savedPost => {
          const updatedPin = pin;
          updatedPin.saved = savedPost.createdAt;
          updatedPin.saver = savedPost.userId;
          this.setState({ pin: updatedPin });
        })
        .catch(err => console.error('Fetch Failed!', err));
    } else if (pin.saved) {
      // Delete from saved:
      const req = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      };
      fetch(`/api/delete-saved/${this.props.postId}`, req)
        .then(response => response.text())
        .then(deletedPin => {
          const updatedPin = pin;
          updatedPin.saved = null;
          updatedPin.saver = null;
          this.setState({ pin: updatedPin });
        })
        .catch(err => console.error('Fetch Failed!', err));
    }
  }

  reportPin() {
    event.preventDefault();
    const req = {
      method: 'PATCH'
    };
    fetch(`/api/report/${this.props.postId}`, req)
      .then(res => res.json())
      .then(reported => {
        const updatedPin = this.state.pin;
        updatedPin.reported = true;
        this.setState({ pin: updatedPin });
        this.handleClose();
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
    const { pin } = this.state;
    const { user } = this.context;

    if (!user) return <Redirect to='registration' />;

    if (pin.error) {
      return (
        <Container className='text-center'>
          <h2 className='mt-5 pri-color nf'>404</h2>
            <p className='my-2'>{ pin.error }</p>
            <a href='#' className='pri-color'>
              Return to the City Canvas home feed
            </a>
        </Container>
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
                    `head-text pri-color py-2 ${pin.reported === true
                      ? 'me-5 pe-1'
                      : ''}`
                  }
                >
                  { pin.reported === true
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
                  { pin.reported === false
                    ? <Card.Link
                        role='button'
                        className='ab-bottom grey report me-5'
                        onClick={ this.handleShow }>
                          Report as removed from view
                      </Card.Link>
                    : <Card.Text className='ab-bottom warning report mb-0 me-5 pe-1'>
                        Reported as removed from view
                      </Card.Text>
                  }
                  <Card.Link href='' className="bg-white ab-bottom-right">
                    <i className={ pin.saved === null
                      ? 'grey not-saved fas fa-heart fa-lg'
                      : 'sec-color fas fa-heart fa-lg' }
                      onClick={ this.toggleSaved }></i>
                  </Card.Link>
              </Card.Body>
            </Col>
          </Card>
        </Container>

        <ModalReport
          show={ this.state.show }
          onHide={ this.handleClose }
          report={ this.reportPin }
        />

      </>
    );
  }
}

PinPage.contextType = AppContext;
