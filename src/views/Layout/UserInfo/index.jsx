import DropdownLanguage from './DropdownLanguage'
import { LogoutIcon } from 'icons'
import { Row } from 'react-bootstrap'
import { useStore } from 'hooks'
import { useNavigate } from 'react-router-dom'

const UserInfo = () => {
  const authStore = useStore('authStore')
  const navigate = useNavigate()

  const logOut = () => {
    authStore.signOut()
    navigate('/signin', { replace: true })
  }

  return (
    <Row className="user_info">
      <DropdownLanguage className="user_info-item" />
      <LogoutIcon onClick={logOut} className="user_info-item logout_icon" style={{ cursor: 'pointer' }} />
    </Row>
  )
}
export default UserInfo
