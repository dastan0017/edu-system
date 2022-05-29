import { applySnapshot, getSnapshot, types } from 'mobx-state-tree'
import { fromPromise, FULFILLED } from 'mobx-utils'
import { TutorialModel } from 'stores/models'
import { apiV1 } from '../../utils'
import { when } from 'mobx'

const TutorialsStore = types
  .model('TutorialsStore')
  .props({
    _tutorials: types.optional(types.array(TutorialModel), []),
    _isPending: types.optional(types.boolean, false),
  })
  .actions(self => {
    const API_URL = '/Tutorials'

    const setTutorials = data => {
      applySnapshot(self._tutorials, data)
    }

    const getTutorials = () => {
      const request = fromPromise(apiV1.get(`${API_URL}`))
      when(() => {
        request.case({
          fulfilled: response => {
            setTutorials(response.data.data)
            return true
          },
        })
      })
      return request
    }
    const addNewTutorial = data => {
      const request = fromPromise(apiV1.post(`${API_URL}`, { data: data }))
      return request
    }

    return {
      getTutorials,
      setTutorials,
      addNewTutorial,
    }
  })
  .views(self => ({
    get tutorials() {
      return getSnapshot(self._tutorials)
    },
    get isPending() {
      return self._isPending
    },
  }))

export default TutorialsStore
