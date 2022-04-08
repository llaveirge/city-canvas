import React from 'react';
import RegistrationForm from '../components/registration-form';
import SignInForm from '../components/sign-in-form';

export default function Registration(props) {

  const form = props.form;

  return (
      <>
        <div className='pg-registration d-flex py-5 py-md-0'>
          { form === 'sign-up' ? <RegistrationForm /> : <SignInForm /> }
        </div>
      </>
  );

}
