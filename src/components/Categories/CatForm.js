import React from 'react'
//Below we bring in the components from Formik in order to put our form together in the UI below.
import { Formik, Form, Field } from 'formik'
import { catSchema } from '../../utilities/validationSchema'
import axios from 'axios'

export default function CatForm(props) {

    const handleSubmit = (values) => {
        console.log(values)
        if(!props.category){
            //If we enter this scope, we know we are in create mode, so we'll make our POST call here.
            const catToCreate = values//assemble a temp object to send in our request

            //send the object in a POST request to our API
            axios.post(`https://localhost:7084/api/Categories`, catToCreate).then(() => {
                props.setShowCreate(false)//This closes our create form (passed as a prop from Categories.js)
                props.getCategories(false)//This will make a GET request to the API showing the new Category (also from Categories.js)
            })
        } else {
            //If we enter this scope, we know we are in edit mode. So we'll make our PUT call here.
            const catToEdit = {
                categoryId: props.category.categoryId,
                categoryName: values.categoryName,
                categoryDescription: values.categoryDescription
            }

            axios.put(`https://localhost:7084/api/Categories/${[props.category.categoryId]}`, catToEdit).then(() => {
                props.setShowEdit(false)
                props.getCategories()
            })
        }
    }

  return (
    <div className='createCategory m-2 text-white text-center'>
        <Formik
            initialValues={{
                //Below is a ternary operator that will fill out our form with current values of a category when in edit
                //mode, or a blank form when we are in create mode.
                categoryName: props.category ? props.category.categoryName : '',
                categoryDescription: props.category ? props.category.categoryDescription : '',
            }}
            validationSchema={catSchema}
            onSubmit={values => handleSubmit(values)}>

            {({errors, touched}) => (
                //Render the form below
                <Form id='catForm' className='row text-center m-auto'>
                    <div className="form-group m-1 p-1">
                        <Field name='categoryName' className='form-control' placeholder='Name' />
                        {errors.categoryName && touched.categoryName && 
                            <div className="text-danger">{errors.categoryName}</div>
                        }
                    </div>
                    <div className="form-group m-1 p-1">
                        <Field name='categoryDescription' className='form-control' placeholder='Description' />
                        {errors.categoryDescription && touched.categoryDescription && 
                            <div className="text-danger">{errors.categoryDescription}</div>
                        }
                    </div>
                    <div className="form-group m-1">
                        <button className="btn btn-success">Submit Category to API</button>
                    </div>
                </Form>
            )}

        </Formik>
    </div>
  )
}
