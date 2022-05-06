import React from 'react';

export default function NotFound(props) {
  return (
    <div className='text-center'>
      <h1 className='mt-5 pri-color display-3 fw-bold'>404</h1>
        <p className='my-2'>
          <em>This isn&apos;t the page you&apos;re looking for...</em>
          <br/>
          <a href='#' className='pri-color'>
            Return to the City Canvas home page
          </a>
        </p>
    </div>
  );
}
