import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function FilterCat(props) {
    //We need access to our categories in order to .map them into buttons, so we write a hook to store them.
    //usf is the shortcut to build the const below btw
    const [categories, setCategories] = useState([])

    //uef
    useEffect(() => {
        axios.get(`https://localhost:7084/api/Categories`).then(response => {
            console.log(response)
            setCategories(response.data)
        })
    }, []);

  return (
    <div className='text-center mt-5'>
        <button className='btn btn-outline-info bg-dark m-1' onClick={() => props.setFilter(0)}>
            All
        </button>
        {/* Below, we map all of the categories to a button that will be used to filter resources on that category */}
        {categories.map( c => 
            <button key={c.categoryId} className='btn btn-outline-info bg-dark m-1' 
            onClick={() => props.setFilter(c.categoryId)}>
                {c.categoryName}
            </button>
        )}
    </div>
  )
}
