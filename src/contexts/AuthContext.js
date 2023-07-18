//We will create a React Context in this file that will house all authentication info (currentUser, login, logout).
//React contexts allow us to store information and transport that info to the components that use it. We could store
//this info in the App component and just pass props to send the user information to other components but this isn't
//ideal for larger apps. Instead, we create the context and a component that will communicate this context to its
//children. Think of this much like Session storage in a .NET application.

//Below, we bring in useState for a stateful component, useEffect to fire off a function automatically, and
//useContext to create the context itself
import React, { useState, useEffect, useContext } from 'react'
//we also need to import the auth object we initialized in base.js
import { auth } from '../base'
//finally, we need to import specific firebase functions for logging in with GitHub and logging out.
import { GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

//Below, we create a context (storage object) for all our auth info
const AuthContext = React.createContext()

//Below, we write a function that allows us to use the context in our components. We will import it any time we want
//access to the currentUser, Login or Logout functionality
export function useAuth(){
    return useContext(AuthContext)
}

//This component will provide the AuthContext info to the children components nested inside it.
//See App.js where we call to an instance of this component and nest all other components inside of it
export default function AuthProvider({children}) {
    //Below, we write two hooks: One will store our currentUser, the other is a custom hook to determine if the context
    //has info to share with child components before rendering the children to the screen
    const [currentUser, setCurrentUser] = useState()
    const [loading, setloading] = useState(true)

    //Login functionality
    //Instantiate a GithubAuthProvider object
    const githubAuthProvider = new GithubAuthProvider()

    async function login() {
        return (signInWithPopup(auth, githubAuthProvider).then(authData => {
            console.log(authData)
            setCurrentUser(authData.user)
            //Here, we could optionally add additional logic to set a user's role or save info to a local db
        }))
    }

    //logout functionality
    async function logout() {
        signOut(auth).then(setCurrentUser(null))
    }

    //The object below will hold currentUser, login and logout so we can use them anywhere in our application.
    //We will pass this object as a prop in the return below.
    const value = { currentUser, login, logout }

    useEffect(() => {
        //authChange will use Firebase functionality to get user info, set the currentUser hook to the value
        //retrieved, and allow components to load using our custom loading hook
        const authChange = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setloading(false)
        })

        return authChange
    }, []);

  return (
    <AuthContext.Provider value={value}>
        {/* Below, we are waiting for the AuthContext info to populate before loading the child components in the UI */}
        {!loading && children}
    </AuthContext.Provider>
  )
}
