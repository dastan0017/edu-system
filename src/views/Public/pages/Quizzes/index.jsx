import { Button, Row } from 'react-bootstrap'
import { useStore, usePromise } from 'hooks'
import '../Pages.scss'
import { Link } from 'react-router-dom'

const Quizzes = () => {
  const { getQuizzes, quizzes } = useStore('quizzesStore')
  const { loading, error } = usePromise(getQuizzes)

  return (
    <Row className="w-100">
      <Row className="page_content">
        <Row className="cards">
          {quizzes.map(quiz => (
            <Row key={quiz.attributes.name} className="quiz_card">
              <h3>{quiz.attributes.name}</h3>
              <p>{quiz.attributes.description}</p>
              <p style={{ fontWeight: 'bolder' }}>
                Количество вопросов: <strong>{quiz.attributes.questions.data.length}</strong>
              </p>
              <Link to={quiz.id.toString()}>
                <Button>ПРОЙТИ ТЕСТ</Button>
              </Link>
            </Row>
          ))}
        </Row>
      </Row>
    </Row>
  )
}

export default Quizzes
