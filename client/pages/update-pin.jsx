import React from 'react';
import UpdatePinForm from '../components/update-pin-form';
import NetworkErrorPage from './network-error';
import { Container } from 'react-bootstrap';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';

export default class UpdatePin extends React.Component {
  render() {
    const { user } = this.context;

    if (!user) return <Redirect to='registration' />;
    if (!navigator.onLine) return <NetworkErrorPage />;

    return (
      <>
        <Container>
          <h3 className='head-text pri-color py-2 mt-4 text-center'>
            Update City Canvas Pin
          </h3>
          <UpdatePinForm postId={ +this.props.postId } user={ user.userId }/>
        </Container>
      </>
    );
  }
}

UpdatePin.contextType = AppContext;
