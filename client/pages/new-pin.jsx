import React from 'react';
import NewPinForm from '../components/new-pin-form';
import { Container } from 'react-bootstrap';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';

export default class NewPin extends React.Component {
  render() {
    const { user } = this.context;
    if (!user) return <Redirect to='registration' />;

    return (
      <>
        <Container>
          <h3 className='head-text pri-color py-2 mt-4 text-center'>
            New City Canvas Pin
          </h3>
          <NewPinForm user={ user.userId }/>
        </Container>
      </>
    );
  }
}

NewPin.contextType = AppContext;
