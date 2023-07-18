import React from 'react'
import { Container, Row } from 'react-bootstrap'
import RouterInfo from './RouterInfo'
import AuthInfo from './AuthInfo'
import './Routing.css'

export default function Routing() {
  return (
    <section className="routing">
        <article className="text-center m-0 p-5 bg-info">
            <h1>Routing and Authentication</h1>
            <a href="https://reactrouter.com/en/6.14.1/start/tutorial" className="btn btn-outline-dark m-1"
            target='_blank' rel='noreferrer'>
                Routing Docs
            </a>
            <a href="https://firebase.google.com/docs/auth/web/github-auth" className="btn btn-outline-light m-1"
            target='_blank' rel='noreferrer'>
                Authentication
            </a>
        </article>
        <Container>
            <Row>
                <RouterInfo />
                <AuthInfo />
            </Row>
        </Container>
    </section>
  )
}
