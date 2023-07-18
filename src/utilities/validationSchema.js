//This file will house the schemas for both resources and categories for the create/edit form.
//To bring in a simple validation implementation, we are going to use Yup by installing it in our app -- npm install yup...see implementation below

//Yup will work in tandem with Formik, which is an npm package that creates and stores form inputs for each item (categoryName, categoryDescription) that we need to capture in our forms. 
//npm install formik

/* This is what we need for category POST...These are inputs we need in the form. 
    {
        "categoryName": "Test",
        "categoryDescription": "Test desc"
    }
*/
import * as Yup from 'yup'

const catSchema = Yup.object().shape({
    //Below, we call to each property we need to validate and use Yup to define their requirements (maxLength, required, etc)
    categoryName: Yup.string().max(25, 'Max 25 characters').required('Required'),
    categoryDescription: Yup.string().max(50, 'Max 50 characters')
})

const resourceSchema = Yup.object().shape({
    name: Yup.string().max(25, 'Max 25 characters').required('Required'),
    description: Yup.string().max(50, 'Max 50 characters'),
    url: Yup.string().max(75, 'Max 75 characters').required('Required'),
    linkText: Yup.string().max(25, 'Max 25 characters').required('Required'),
    categoryId: Yup.number().required()
    //Above, we make the categoryId required in our app even though our db allows nulls for categoryId.
    //This is to demonstrate our schema can be more restrictive than our database, just not less restrictive
})

export { catSchema, resourceSchema}