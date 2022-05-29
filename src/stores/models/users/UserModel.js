import { types } from 'mobx-state-tree'

const UserModel = types.model('UserModel', {
  userId: types.string,
  userRole: types.string,
  isBlocked: types.boolean,
  fullName: types.string,
})

export default UserModel
