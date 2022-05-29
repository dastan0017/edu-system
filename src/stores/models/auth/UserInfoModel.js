import { types } from 'mobx-state-tree'

const UserInfoModel = types.model('UserInfoModel', {
  jwt: types.maybeNull(types.string),
  user: types.maybeNull(types.model({ username: types.optional(types.string, '', [null, undefined]), email: types.maybeNull(types.string) })),
})

export default UserInfoModel
