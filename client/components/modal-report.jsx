import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function ModalReport(props) {
  return (
    <>
     <Modal
        show={ props.show }
        onHide={ props.onHide }
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className='warning'>Report as Removed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to report this street art as removed from view?
        </Modal.Body>
        <Modal.Footer>
          <Button className='cancel' onClick={ props.onHide }>
            Cancel
          </Button>
          <Button className='del warning-bk' onClick={ props.report }>
            Report
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
