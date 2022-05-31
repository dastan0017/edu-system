import { Row } from 'react-bootstrap'
import '../Pages.scss'
import { useStore, usePromise } from 'hooks'
import { ReadMore } from 'components'

const VideoLessons = () => {
  const { getTutorials, tutorials } = useStore('tutorialsStore')
  const { loading, error } = usePromise(getTutorials)

  return (
    <Row className="w-100">
      <Row className="page_header">
        <h2>Видеоуроки</h2>
      </Row>
      <Row className="page_content">
        <Row className="cards">
          {tutorials.map(tutorial => (
            <Row key={tutorial.attributes.name} className="card">
              <Row className="description">
                <h3>{tutorial.attributes.name}</h3>
                <div style={{ overflow: 'scroll' }}>
                  <ReadMore text={tutorial.attributes.description} />
                </div>
              </Row>
              <Row className="video">
                <iframe title={tutorial.attributes.name} src={tutorial.attributes.video_link}></iframe>
              </Row>
            </Row>
          ))}
        </Row>
      </Row>
    </Row>
  )
}

export default VideoLessons
