import { types } from 'mobx-state-tree'

export const QuestionsModel = types.model('QuestionsModel', {
  id: types.number,
  attributes: types.model({
    question: types.string,
    A: types.string,
    B: types.string,
    C: types.string,
    D: types.string,
    Answer: types.string,
  }),
})

export const QuizzesModel = types.model('QuizzesModel', {
  id: types.number,
  attributes: types.model({
    name: types.string,
    description: types.maybeNull(types.string),
    questions: types.model({
      data: types.optional(types.array(QuestionsModel), []),
    }),
  }),
})
