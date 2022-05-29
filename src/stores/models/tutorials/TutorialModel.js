import { types } from 'mobx-state-tree'

const TutorialModel = types.model('TutorialModel', {
  id: types.number,
  attributes: types.model({
    name: types.string,
    description: types.maybeNull(types.string),
    video_link: types.string,
  }),
})

export default TutorialModel
