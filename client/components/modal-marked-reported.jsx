import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function ModalMarkedReported(props) {
  return (
    <>
     <Modal show={ props.show } onHide={ props.onHide } centered>
        <Modal.Header closeButton>
          <Modal.Title className='warning'>
            This Pin Has Been Reported
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          This City Canvas pin has been reported as removed from view by another
          user. Please update this pin with accurate information or delete it.
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={ props.onHide }>
            Update
          </Button>
          <Button className='del warning-bk' onClick={ props.showDelete }>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
