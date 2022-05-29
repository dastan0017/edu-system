import React from 'react'
import PropTypes from 'prop-types'
import { Container, Row } from 'react-bootstrap'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import './Layout.scss'

export const Layout = () => {
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

export default Layout
