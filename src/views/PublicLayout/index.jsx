import React from 'react'
import { Container, Row } from 'react-bootstrap'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import './PublicLayout.scss'

export const PublicLayout = () => {
  return (
    <Container style={{ minHeight: '100vh' }}>
      <Row>
        <Navbar />
      </Row>
      <main className="h-100 w-100">
        <div className="page_container">
          <Outlet />
        </div>
      </main>
    </Container>
  )
}

export default PublicLayout
