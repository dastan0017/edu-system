import { useState } from 'react'
import { Row, Button } from 'react-bootstrap'
import { useStore, usePromise } from 'hooks'
import { Loader, AlertDismissible, SimpleModal } from 'components'
import { TutorialForm } from '../../forms'
import { useIntl } from 'react-intl'
import { sendNotification } from 'components/Toast'
import '../Pages.scss'

const VideoLessons = () => {
  const intl = useIntl()
  const { getTutorials, tutorials, addNewTutorial } = useStore('tutorialsStore')
  const { loading, error } = usePromise(getTutorials)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const handleSubmit = async data => {
    try {
      await addNewTutorial(data)
      await getTutorials()

      sendNotification(
        intl.formatMessage({
          id: 'global.successfully',
          defaultMessage: 'Успех',
        }),
        'success',
      )
    } catch (error) {
      sendNotification(intl.formatMessage({ id: 'global.default_error_message' }), 'error')
    } finally {
      setIsModalOpen(false)
    }
  }

  return (
    <Row className="w-100">
      {error && <AlertDismissible message={error} variant="danger" />}
      <SimpleModal
        onSubmit={handleSubmit}
        isOpen={isModalOpen}
        hideModal={() => setIsModalOpen(false)}
        ModalForm={TutorialForm}
        headerTitle="Добавление урока"
      />
      <Row className="page_header">
        <h2>Видеоуроки</h2>
        <Button onClick={openModal}>Добавить</Button>
      </Row>
      <Row className="page_content">
        <Row className="cards">
          {tutorials.map(tutorial => (
            <Row key={tutorial.attributes.name} className="card">
              <Row className="description">
                <h3>{tutorial.attributes.name}</h3>
                <p>{tutorial.attributes.description}</p>
              </Row>
              <Row className="video">
                <iframe
                  title={tutorial.attributes.name}
                  src={tutorial.attributes.video_link}
                  frameBorder="0"
                  allow="accelerometer autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Row>
            </Row>
          ))}
        </Row>
      </Row>
    </Row>
  )
}

export default VideoLessons
