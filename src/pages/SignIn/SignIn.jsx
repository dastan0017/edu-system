import React from 'react'
import PropTypes from 'prop-types'
import { Col } from 'react-bootstrap'
import AuthForm from './Form'
import { useIntl } from 'react-intl'

const SignIn = () => {
  const intl = useIntl()
  return (
    <Col className="form-container">
      <Col>
        <h2>{intl.formatMessage({ id: 'global.enter_system' })}</h2>
        <AuthForm />
      </Col>
    </Col>
  )
}
SignIn.propTypes = {
  stores: PropTypes.object,
  history: PropTypes.object,
}
export default SignIn
