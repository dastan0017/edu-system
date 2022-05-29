import { useState } from 'react'
import { Alert } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'

export const AlertDismissible = ({ message = null, variant = 'danger' }) => {
  const [show, setShow] = useState(true)
  const intl = useIntl()

  if (show) {
    return (
      <Alert variant={variant} onClose={() => setShow(false)} dismissible>
        <Alert.Heading>{intl.formatMessage({ id: 'error' })}</Alert.Heading>
        <p>{message}</p>
      </Alert>
    )
  }
}
AlertDismissible.propTypes = {
  message: PropTypes.any,
  variant: PropTypes.string,
}
