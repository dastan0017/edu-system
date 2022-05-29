import { Modal, Button, Row } from 'react-bootstrap'
import { useIntl } from 'react-intl'
import PropTypes from 'prop-types'
import '../Modals.scss'

export const DeleteModal = ({ data, isOpen, hideModal, onSubmit, headerTitle }) => {
  const intl = useIntl()

  return (
    <Modal centered show={isOpen} onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{headerTitle}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row className="delete_buttons">
          <p>
            {intl.formatMessage({ id: 'delete.message' })}
            <strong>{intl.formatMessage({ id: 'delete.message2' })}</strong>
          </p>
          <Row>
            {/* TODO: Переименовать на data.id после обсуждения ноименований с Мишей */}
            <Button className="btn-primary" onClick={() => onSubmit(data)}>
              {intl.formatMessage({ id: 'global.delete' })}
            </Button>
            <Button className="btn-secondary" onClick={hideModal}>
              {intl.formatMessage({ id: 'global.cancel' })}
            </Button>
          </Row>
        </Row>
      </Modal.Body>
    </Modal>
  )
}
DeleteModal.propTypes = {
  data: PropTypes.object,
  isOpen: PropTypes.bool,
  hideModal: PropTypes.func,
  onSubmit: PropTypes.func,
  headerTitle: PropTypes.string,
}
