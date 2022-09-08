import React from 'react';
import RegistrationForm from '../components/registration-form';
import SignInForm from '../components/sign-in-form';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class Registration extends React.Component {

  render() {
    const form = this.props.form;
    const { handleSignIn, user } = this.context;

    if (user) return <Redirect to='' />;

    return (
      <>
        <div
          // style={{ backgroundImage: 'url(' + './reg-bkg.webp' + ')' }}
          className='pg-registration d-flex py-5 py-md-0'>
            { form === 'sign-up'
              ? <RegistrationForm />
              : <SignInForm onSignIn={ handleSignIn } />
            }
        </div>
      </>
    );
  }
}

Registration.contextType = AppContext;
