import { types } from 'mobx-state-tree'

const LoginCommand = types.model('LoginCommand', {
  identifier: types.string,
  password: types.string,
})

export default LoginCommand
