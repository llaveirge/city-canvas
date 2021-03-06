import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function ModalDelete(props) {
  return (
    <>
     <Modal
        show={ props.show }
        onHide={ props.onHide }
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className='warning'>
            Delete This City Canvas Pin
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this City Canvas pin?
        </Modal.Body>
        <Modal.Footer>
          <Button className='cancel' onClick={ props.onHide }>
            Cancel
          </Button>
          <Button className='del warning-bk' onClick={ props.deletePin }>
              Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
