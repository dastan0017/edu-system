import { applySnapshot, getSnapshot, types } from 'mobx-state-tree'
import { fromPromise, FULFILLED } from 'mobx-utils'
import { QuizzesModel } from 'stores/models'
import { apiV1 } from '../../utils'
import { when } from 'mobx'

const QuizzesStore = types
  .model('QuizzesStore')
  .props({
    _quizzes: types.optional(types.array(QuizzesModel), []),
    _isPending: types.optional(types.boolean, false),
  })
  .actions(self => {
    const API_URL = '/Quizzes'

    const setQuizzes = data => {
      applySnapshot(self._quizzes, data)
    }

    const getQuizzes = () => {
      const request = fromPromise(apiV1.get(`${API_URL}/?populate=*`))
      when(() => {
        request.case({
          fulfilled: response => {
            setQuizzes(response.data.data)
            return true
          },
        })
      })
      return request
    }

    const getQuiz = id => {
      const request = fromPromise(apiV1.get(`${API_URL}/${id}/?populate=*`))
      return request
    }

    return {
      getQuizzes,
      setQuizzes,
      getQuiz,
    }
  })
  .views(self => ({
    get quizzes() {
      return getSnapshot(self._quizzes)
    },
    get isPending() {
      return self._isPending
    },
  }))

export default QuizzesStore
