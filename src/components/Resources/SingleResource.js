import React, { useState } from 'react'

import { useAuth } from '../../contexts/AuthContext'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import ResourceEdit from './ResourceEdit'
import axios from 'axios'

export default function SingleResource(props) {
    //Below, we destructure the properties of resource that we want to use in our UI
    //This is the same mechanism we have been using to access the value properties from our AuthContext
    const { name, description, url, linkText} = props.resource

    //Bring in currentUser to check for admin email
    const { currentUser } = useAuth()
    //Write a hook to manage show/hide of edit form
    const [showEdit, setShowEdit] = useState(false);

    const deleteResource = (id) => {
      if(window.confirm(`Are you sure you want to delete ${props.resource.name}?`)){
        axios.delete(`https://localhost:7084/api/Resources/${id}`).then(() => props.getResources())
      }
    }

  return (
    <div className='singleResource col-md-5 m-4'>
      {/* BEGIN EDIT UI */}
      {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
        <div>
          <button id="editLink" onClick={() => setShowEdit(true)}>
            <FaEdit />
          </button>
          <button id="deleteLink" onClick={() => deleteResource(props.resource.resourceId)}>
            <FaTrashAlt />
          </button>
          {showEdit &&
            <ResourceEdit 
              resource={props.resource}
              showEdit={showEdit}
              setShowEdit={setShowEdit}
              getResources={props.getResources}/>
          }
        </div>
      }
      {/* END EDIT UI */}
        <h3>{name}</h3>
        {description !== null ? 
            <p>{description}</p> : 
            <p>No description provided</p>
        }

        <a href={url} target='_blank' rel='noreferrer' className="btn btn-info">
            Visit {linkText}
        </a>
    </div>
  )
}
