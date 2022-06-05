import { Suspense, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useStore } from 'hooks'
import { Button, Row } from 'react-bootstrap'
import '../Pages.scss'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const SingleQuiz = () => {
  let { quizId } = useParams()
  const { getQuiz } = useStore('quizzesStore')
  const navigate = useNavigate()

  const [quiz, setQuiz] = useState(null)
  const [result, setResult] = useState({ TRUE: 0, FALSE: 0 })
  const [isEnded, setIsEnded] = useState(false)

  const { register, handleSubmit, errors } = useForm()

  useEffect(() => {
    getQuiz(quizId).then(response => {
      setQuiz(response.data.data)
    })
  }, [getQuiz, quizId])

  const onSubmit = data => {
    const entries = Object.entries(data)
    let TRUE = 0
    let FALSE = 0

    // CALCULATE RESULT
    for (let i = 0; i < entries.length; i++) {
      const answer = quiz.attributes.questions.data.filter(el => el.id == entries[i][0])[0].attributes.Answer
      const userAnswer = entries[i][1]

      answer === userAnswer ? TRUE++ : FALSE++
    }

    setResult({ TRUE, FALSE })
    setIsEnded(true)
  }

  const goBack = () => {
    navigate(-1)
  }

  return (
    <Suspense fallback={<div>...loading</div>}>
      <Row className="w-100">
        <Row className="page_header">
          <h2>{quiz?.attributes.name}</h2>
        </Row>
        <Row className="page_content">
          {!isEnded ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row className="questions">
                {quiz?.attributes?.questions.data.map((el, idx) => (
                  <Row key={el.id} className="question">
                    <h3>{el.attributes.question}</h3>
                    <div className="answers">
                      <div>
                        <input type="radio" value="A" name={el.id} ref={register} /> {el.attributes.A}
                      </div>
                      <div>
                        <input type="radio" value="B" name={el.id} ref={register} /> {el.attributes.B}
                      </div>
                      <div>
                        <input type="radio" value="C" name={el.id} ref={register} /> {el.attributes.C}
                      </div>
                      <div>
                        <input type="radio" value="D" name={el.id} ref={register} /> {el.attributes.D}
                      </div>
                    </div>
                  </Row>
                ))}
                <Row className="finish">
                  <Button variant="outline-secondary" onClick={goBack}>
                    НАЗАД
                  </Button>
                  <Button type="submit">ЗАВЕРШИТЬ</Button>
                </Row>
              </Row>
            </form>
          ) : (
            <Row className="result">
              <h3>Ваш результат</h3>
              <Row className="result_answer">
                <div className="true">
                  <h4>
                    ПРАВИЛЬНО: <span>{result.TRUE}</span>
                  </h4>
                </div>
                <div className="false">
                  <h4>
                    НЕПРАВИЛЬНО: <span>{result.FALSE}</span>
                  </h4>
                </div>
              </Row>
              <Button variant="outline-secondary" onClick={goBack}>
                НАЗАД
              </Button>
            </Row>
          )}
        </Row>
      </Row>
    </Suspense>
  )
}

export default SingleQuiz
