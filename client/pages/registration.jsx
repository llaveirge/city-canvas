import React from 'react';
import RegistrationForm from '../components/registration-form';
import SignInForm from '../components/sign-in-form';
import AppContext from '../lib/app-context';

export default class Registration extends React.Component {

  render() {
    const form = this.props.form;
    const { handleSignIn, user } = this.context;

    if (user) {
      window.location.hash = '#';
    }

    return (
      <>
        <div className='pg-registration d-flex py-5 py-md-0'>
          { form === 'sign-up' ? <RegistrationForm /> : <SignInForm onSignIn={ handleSignIn } /> }
        </div>
      </>
    );
  }

}

Registration.contextType = AppContext;
