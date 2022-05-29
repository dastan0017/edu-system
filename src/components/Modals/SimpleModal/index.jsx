import { Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'
import '../Modals.scss'

export const SimpleModal = ({ data, isOpen, hideModal, onSubmit, ModalForm, headerTitle }) => {
  return (
    <Modal centered show={isOpen} onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{headerTitle}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ModalForm data={data} onSubmit={formData => onSubmit({ ...formData })} />
      </Modal.Body>
    </Modal>
  )
}
SimpleModal.propTypes = {
  data: PropTypes.object,
  isOpen: PropTypes.bool,
  hideModal: PropTypes.func,
  onSubmit: PropTypes.func,
  ModalForm: PropTypes.func,
  headerTitle: PropTypes.string,
}
export default SimpleModal
