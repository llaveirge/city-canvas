import React from 'react';
import RegistrationForm from '../components/registration-form';

export default class Registration extends React.Component {
  render() {
    return (
      <>
      <div className='pg-registration d-flex py-5 py-md-0'>
          <RegistrationForm />
      </div>
      </>
    );
  }
}
