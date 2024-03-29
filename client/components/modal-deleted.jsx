import React from 'react';
import LoadingSpinner from './loading-spinner';
import { Modal, Button } from 'react-bootstrap';

export default function ModalDelete(props) {
  return (
    <>
     <Modal show={ props.show } onHide={ props.onHide } centered>
        <Modal.Header closeButton>
          <Modal.Title className='warning'>
            Delete This City Canvas Pin
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Are you sure you want to delete this City Canvas pin?
        </Modal.Body>

        <Modal.Footer className='position-relative pt-3 pb-4'>
          <Button
            className='cancel'
            onClick={ props.onHide }
            disabled={ props.isLoading }
          >
            Cancel
          </Button>
          <Button
            className='del warning-bk'
            onClick={ props.deletePin }
            disabled={ props.isLoading }
          >
             Delete
          </Button>
          { props.isLoading
            ? <div className='spin-absolute-modal'><LoadingSpinner /></div>
            : null
          }
        </Modal.Footer>
      </Modal>
    </>
  );
}
