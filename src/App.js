import React from 'react'
import './App.css'
//Below are a few react-router-dom components that provide our routing functionality.
//1. BrowserRouter - Router for the app (we must place the Navigation and Routes inside these tags)
//2. Routes - kind of like a switch - details all the Route components inside 
//3. Route - for every route in our app we will have a Route component listed below. This gives instructions to the app for what component to display based on the url path
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//Child components imported below
import Bootstrap from './components/Bootstrap/Bootstrap.js'
import Routing from './components/Routing/Routing'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import NotFound from './components/NotFound'
import AuthProvider from './contexts/AuthContext'
import Login from './components/Auth/Login'
import ProtectedRoute from './components/Routing/ProtectedRoute'
import Categories from './components/Categories/Categories'
import Resources from './components/Resources/Resources'

export default function App() {
  return (
    <div className="App">
      {/* Below, we call on the AuthProvider component we exported from AuthContext.js
      Now every component that is wrapped inside the AuthProvider has access to AuthContext */}
      <AuthProvider>
        {/* The below component is actually calling the BrowserRouter but we made an alias in the import. We surround the Navigation because it has Link components called from react-router-dom package and rendered in that component. Per the docs on their site: Link, Routes, and each Route need to be rendered inside the Router. */}
        <Router>
          {/* This is like a switch that decides what to render to the screen based on the current URL path. */}
          <Navigation />
          <Routes>
            <Route path='/' element={<ProtectedRoute><Resources/></ProtectedRoute>} />
            <Route path='/resources' element={<ProtectedRoute><Resources/></ProtectedRoute>} />
            <Route path='/categories' element={<ProtectedRoute><Categories/></ProtectedRoute>} />
            <Route path='/bootstrap' element={<Bootstrap />} />
            <Route path='/routing' element={ <Routing/> } />
            <Route path='/login' element={<Login />} />
            
            {/* The NotFound component will be an error handler (page showing a nice message) and will be tied to any other Route than what is detailed above. All routes listed above this Route will have very specific paths that are listed for them. This Route will be a catch all for the rest of what could be in the path */}
            <Route path='*' element={<NotFound/>} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  )
}
