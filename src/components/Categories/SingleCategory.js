import React, { useState,} from 'react'
import { useAuth } from '../../contexts/AuthContext'
//below we bring in react-icons to use in our action buttons
//for access we must first `npm install react-icons`
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import CatEdit from './CatEdit'
//We bring in axios below for delete functionality
import axios from 'axios'

export default function SingleCategory(props) {
  //the below hook will show/hide the edit form
  const [showEdit, setShowEdit] = useState(false);
  //we bring in currentUser from our AuthContext
  const { currentUser } = useAuth()

  const deleteCat = (id) => {
    if(window.confirm(`Are you sure you want to delete ${props.category.categoryName}?`)){
      axios.delete(`https://localhost:7084/api/Categories/${id}`).then(() => props.getCategories())
    } 
  }

  return (
    <tr>
        <td>{props.category.categoryName}</td>
        <td>{props.category.categoryDescription} </td>
        {/* BEGIN EDIT UI */}
        {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
          <td>
            <button className="m-1 rounded" id='editLink' onClick={() => setShowEdit(true)}>
              <FaEdit />
            </button>
            <button className="m-1 rounded" id='deleteLink' onClick={() => deleteCat(props.category.categoryId)}>
              <FaTrashAlt />
            </button>
            {showEdit &&
              <CatEdit 
                setShowEdit={setShowEdit}//used to close edit form in CatEdit AND CatFrom
                showEdit={showEdit}//tied to opening/closing the modal in CatEdit
                getCategories={props.getCategories}//used in CatForm to refresh categories from API
                category={props.category}/>
            }
          </td>
        }
        {/* END EDIT UI */}
    </tr>
  )
}
