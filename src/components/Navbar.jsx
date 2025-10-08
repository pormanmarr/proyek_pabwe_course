import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import Swal from 'sweetalert2'

function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    Swal.fire({ icon: 'success', title: 'Logout berhasil', timer: 1200, showConfirmButton: false })
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <i className="bi bi-journal-text me-2"></i>
          Courses
       
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
             
            </li>
          </ul>
          <div className="d-flex align-items-center gap-2">
            {isAuthenticated && (
              <Link to="/courses/new" className="btn btn-outline-light">
                <i className="bi bi-plus-circle me-1"></i>
                Tambah Kursus
              </Link>
            )}
            {isAuthenticated ? (
              <button className="btn btn-light" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-1"></i>
                Logout
              </button>
            ) : (
              <Link to="/login" className="btn btn-light">
                <i className="bi bi-box-arrow-in-right me-1"></i>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar