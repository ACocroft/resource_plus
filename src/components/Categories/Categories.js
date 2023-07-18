//Below, we import useState to have a hook to store our Resources in and useEffect to automate the GET request
import React, {useState, useEffect} from 'react'
import { Container } from 'react-bootstrap'
//Below, we import axios after installing with `npm install axios`
import axios from 'axios'
import SingleCategory from './SingleCategory';

//We need access to the current user for our create functionality
import { useAuth,  } from '../../contexts/AuthContext';
import CatCreate from './CatCreate';

//Steps to Read functionality
//1. add useState and useEffect to the react import
//2. install and import axios
//3. create the hook to store the data
//4. create the function that uses axios to get the categories
//5. create useEffect to automate retrieval of data in this component
//----- You should now have your data stored, and now on to the UI
//6. use .map to render each category to the screen (also add any supplemental UI (table and thead)...combo of Categories and SingleCategory)

//Steps to Create functionality
//1. Create validationSchema and form specific to Categories
//2. import currentUser from the context
//3. Create a react hook to show/hide the form
//4. Create and render CatCreate in the conditonal rendering, based on whether the user is an admin or not
//5. Update the create functionality in CatForm.js

export default function Categories() {
    //The below hook stores our categories after they are returned from the API
    const [categories, setCategories] = useState([]);
    //Above, we need to pass empty brackets ([]) to useState so that our .map of categories in the UI doesn't error

    //The two hooks below are used for create functionality
    //This first hook destructures current user off of the value returned by useAuth()
    const { currentUser } = useAuth()
    //This second hook will show/hide the create form
    const [showCreate, setShowCreate] = useState(false)


    const getCategories = () => {
        axios.get(`https://localhost:7084/api/Categories`).then(response => {
            console.log(response)
            setCategories(response.data)
        })
    }

    useEffect(() => {
        getCategories()
    }, [])

    

  return (
    <section className="categories">
        <article className="bg-info p-5">
            <h1 className="text-center">Categories Dashboard</h1>
        </article>

        {/* BEGIN CREATE UI */}
        {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
            <div className="bg-dark p-2 mb-3 text-center">
                {showCreate ?
                    <>
                        <button onClick={() => setShowCreate(false)} className="btn btn-warning">Cancel</button>
                        <CatCreate setShowCreate={setShowCreate} getCategories={getCategories}/>
                    </> :
                    <button onClick={() => setShowCreate(true)} className="btn btn-info">Create Category</button>
                }
            </div>
        }
        {/* END CREATE UI */}
        
        <Container className='p-2'>
            <table className="table bg-info table-dark my-3">
                <thead className="table-secondary text-uppercase">
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL && 
                            <th>Actions</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {/* READ UI */}
                    {categories.map(c => 
                        //Below we added getCategories as a prop when implementing EDIT functionality
                        <SingleCategory key={c.categoryId} category={c} getCategories={getCategories}/>    
                    )}
                </tbody>
            </table>
        </Container>
    </section>
  )
}
