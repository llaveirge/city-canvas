import React from 'react';
import LoadingSpinner from './loading-spinner';
import { Modal, Button } from 'react-bootstrap';

export default function ModalReport(props) {
  return (
    <>
     <Modal show={ props.show } onHide={ props.onHide } centered>
        <Modal.Header closeButton>
          <Modal.Title className='warning'>Report as Removed</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Are you sure you want to report this street art as removed from view?
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
            onClick={ props.report }
            disabled={ props.isLoading }
          >
            Report
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
