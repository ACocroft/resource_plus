import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import { resourceSchema } from '../../utilities/validationSchema'
import axios from 'axios'

export default function ResourceForm(props) {
    //We need to get categories from the API to populate the drop down for a resource's category field
    const [categories, setCategories] = useState([])

    const getCategories = () => {
        axios.get(`https://localhost:7084/api/Categories`).then(response => {
            console.log(response)
            setCategories(response.data)
        })
    }

    const handleSubmit = (values) => {
        console.log(values)
        if(!props.resource){
            //Here, there is no props.resource until we create one
            const resourceToCreate = values

            axios.post(`https://localhost:7084/api/Resources`, resourceToCreate).then(() => {
                props.setShowCreate(false)
                props.getResources()
            })
        } else {
            //Here there IS a props.resource, so we edit it
            const resourceToEdit = {
                resourceId: props.resource.resourceId,
                name: values.name,
                url: values.url,
                linkText: values.linkText,
                description: values.description,
                categoryId: values.categoryId
            }

            //Make the PUT request
            axios.put(`https://localhost:7084/api/Resources/${props.resource.resourceId}`, resourceToEdit).then(() => {
                props.getResources()
                props.setShowEdit(false)
            })
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

  return (
    <Formik
        initialValues={{
            name: props.resource ? props.resource.name : '',
            url: props.resource ? props.resource.url : '',
            linkText: props.resource ? props.resource.linkText : '',
            description: props.resource ? props.resource.description : '',
            categoryId: props.resource ? props.resource.categoryId : ''
        }}
        validationSchema={resourceSchema}
        onSubmit={(values) => handleSubmit(values)}>
        {/* start with this structure below and add the form to the empty parens 
            {({ errors, touched }) => ()}*/}
        {({ errors, touched }) => (
            <Form id='resourceForm'>
                <div className="form-group m-3">
                    <Field name='name'className='form-control' placeholder='Name' />
                    {errors.name && touched.name && 
                        <div className="text-danger">{errors.name}</div>
                    }
                </div>
                <div className="form-group m-3">
                    <Field name='url'className='form-control' placeholder='Url' />
                    {errors.url && touched.url && 
                        <div className="text-danger">{errors.name}</div>
                    }
                </div>
                <div className="form-group m-3">
                    <Field name='linkText'className='form-control' placeholder='Link Text' />
                    {errors.linkText && touched.linkText && 
                        <div className="text-danger">{errors.linkText}</div>
                    }
                </div>
                <div className="form-group m-3">
                    <Field name='description' as='textarea' className='form-control' placeholder='Description' 
                    style={{ resize: 'none', height: '5em' }} />
                    {errors.description && touched.description && 
                        <div className="text-danger">{errors.description}</div>
                    }
                </div>
                <div className="form-group m-3">
                    <Field name='categoryId' as='select' className='form-control'>
                        <option value='' disabled>
                            [--Please Choose--]
                        </option>
                        {/* Below we will map an option for every category in the API */}
                        {categories.map(cat =>
                            <option key={cat.categoryId} value={cat.categoryId}>
                                {cat.categoryName}
                            </option>    
                        )}
                    </Field>
                </div>
                <div className="form-group m-3">
                    <button type='submit' className="btn btn-info m-3">
                        Submit Resource to API
                    </button>
                </div>
            </Form>
        )}

    </Formik>
  )
}
