import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

////Below we are making a component that redirects the unauthenticated user to the login screen. We pass in children in the params as a prop which refers to any component that is nested inside of ProtectedRoute tags.

export default function ProtectedRoute({children}) {
    const { currentUser } = useAuth()

    //Below we check for a currentUser. If one exists, render the children, otherwise navigate user to the Login
    //This is an example of a one-line return
  return currentUser ? children : <Navigate to='/login'/>
}
