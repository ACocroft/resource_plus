import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap';
import SingleResource from './SingleResource';
import './Resources.css'
import FilterCat from './FilterCat';

//For create we need the currentUser
import { useAuth } from '../../contexts/AuthContext';
import ResourceCreate from './ResourceCreate';

//Steps to Read functionality
//1. add useState and useEffect to the react import
//2. install and import axios
//3. create the hook to store the data
//4. create the function that uses axios to get the resources
//5. create useEffect to automate retrieval of data in this component
//----- You should now have your data stored, and now on to the UI
//6. use .map to render each resource to the screen (also add any supplemental UI (container for the gallery)...combo of Resources/SingleResource)

export default function Resources() {
    const [resources, setResources] = useState([])

    //For create functionality we destructure currentUser from useAuth() and make a hook to show create form
    const { currentUser } = useAuth()
    const [showCreate, setShowCreate] = useState(false);

    //Filtering steps - use .filter() to create a limited list of resources.
    //1. Create a hook that will store values for what the user wants to filter resources by...this hook will store the categoryId for the category they want to filter by.
    //2. place the conditional rendering for when filter === 0 in the initial map of resources
    //3. Create FilterCat to give the buttons to the user to filter by
    //4. Render in resources...see below
    //5. Create the conditional rendering for when filter != 0...see below

    const [filter, setFilter] = useState(0);
    //above, we initialize filter with a value of 0 because 0 is not an id for any category in our Resources db

    const getResources = () => {
        axios.get(`https://localhost:7084/api/Resources`).then(response => {
            console.log(response)
            setResources(response.data)
        })
    }

    useEffect(() => {
        getResources()
    }, [])

  return (
    <section className="resources">
        <article className="bg-info p-5">
            <h1 className="text-center">Resources Dashboard</h1>
        </article>
        {/* BEGIN CREATE UI */}
        {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
            <div className="bg-dark p-2 mb-3 text-center">
                <button className="btn btn-info" onClick={() => setShowCreate(!showCreate)}>
                    {!showCreate ? 'Create New Resource' : 'Close Form'}
                </button>
                <div className="createContainer">
                    {showCreate &&
                        <ResourceCreate getResources={getResources} setShowCreate={setShowCreate} />
                    }
                </div>
            </div>
        }
        {/* END CREATE UI */}
        <FilterCat setFilter={setFilter} />
        <Container>
            <article className="resourceGallery row justify-content-center">
                {/* Below we write a ternary to check if the user is filtering or not.
                If there is a filter, display the correct resources for that category. */}
                {filter === 0 ? resources.map(r => 
                    //SingleResource will map each resource to a tile in our display...we add getResources so we can pass 
                    //GET request functionality into SingleResource for Edit/Delete (updating the resources after editing/
                    //deleting)
                    <SingleResource key={r.resourceId} resource={r} getResources={getResources} />   
                ) : resources.filter(r => r.categoryId === filter).map(r => 
                    <SingleResource key={r.resourceId} resource={r} getResources={getResources}/>
                )}
                {/* If a user chooses a filter and there are no resources in that category, we want to render
                a message explaining that there are no results. */}
                {filter !== 0 && resources.filter(r => r.categoryId === filter).length === 0 && 
                    <h2 className="alert alert-warning text-dark">
                        There are no results for this category.
                    </h2>
                }
            </article>
        </Container>
    </section>
  )
}
