import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

function RequireAuth({ children }) {
  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated)
  const location = useLocation()
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }
  return children
}

export default RequireAuth