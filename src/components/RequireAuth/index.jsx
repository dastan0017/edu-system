import { useLocation, Navigate, Outlet } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useStore } from 'hooks'

export const RequireAuth = ({ allowedRoles }) => {
  const authStore = useStore('authStore')
  const location = useLocation()

  return allowedRoles?.includes(authStore?.user?.userRole) ? (
    <Outlet />
  ) : authStore?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  )
}
RequireAuth.propTypes = {
  allowedRoles: PropTypes.array,
}

export default RequireAuth
