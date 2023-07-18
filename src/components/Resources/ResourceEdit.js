import React from 'react'
import { Modal } from 'react-bootstrap'
import ResourceForm from './ResourceForm'

export default function ResourceEdit(props) {
  return (
    <Modal
        show={props.showEdit}
        onHide={() => props.setShowEdit(false)}
        size='lg'>
            <Modal.Header className='bg-info' closeButton>
                <h3>Editing {props.resource.name}</h3>
            </Modal.Header>
            <Modal.Body>
                <ResourceForm resource={props.resource} setShowEdit={props.setShowEdit} getResources={props.getResources}/>
            </Modal.Body>
    </Modal>
  )
}
