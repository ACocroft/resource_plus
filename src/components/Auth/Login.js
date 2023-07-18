import React from 'react'
//Any time we want to access the AuthContext, there are three steps for full implementation
//Step 1 - We must first import useAuth from AuthContext
import { useAuth } from '../../contexts/AuthContext'
import { Container, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    //Step 2 - Destructure the objects we want from useAuth and save them in a hook
    const { login } = useAuth()
    const navigate = useNavigate()

    //Below we write a custom handler function to log the user in and redirect them home upon success
    async function handleAuth() {
        //The await keyword pauses any more code from executing until we get a response back from the login function
        await login()

        //Return the user to the home view using useNavigate hook from react-router-dom
        return navigate('/')
    }

  return (
    //Step 3 - Create the UI and call upon the login function as needed.
    <div className='login'>
        <article className="bg-info mb-5 p-5 text-dark">
            <h1 className="text-center">Welcome to ResourcePlus!</h1>
        </article>
        <Container>
            <Card className='m-2 border-dark text-center'>
                <Card.Header className='bg-dark text-white'>
                    <h2>Login for full functionality</h2>
                </Card.Header>
                <Card.Body>
                    <button className="btn btn-success" onClick={() => handleAuth()}>
                        Login w/ GitHub
                    </button>
                </Card.Body>
            </Card>
        </Container>
    </div>
  )
}
