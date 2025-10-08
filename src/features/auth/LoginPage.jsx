import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from './authSlice'
import Swal from 'sweetalert2'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Login gagal',
        text: 'Email dan password wajib diisi.',
      })
      return
    }
    dispatch(login({ email }))
    Swal.fire({
      icon: 'success',
      title: 'Login berhasil',
      timer: 1200,
      showConfirmButton: false,
    })
    navigate('/courses')
  }

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="w-100" style={{ maxWidth: 400 }}>
        <div className="card shadow border-0 mx-auto rounded-4">
          <div className="card-body p-4">
            <h3 className="text-center fw-bold text-primary mb-4">
              Masuk ke Aplikasi Courses
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  className="form-control rounded-3"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gmail.com"
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control rounded-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="admin"
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label="Tampilkan/sembunyikan password"
                  >
                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </button>
                </div>
              </div>
              <button className="btn btn-primary w-100 rounded-3" type="submit">
                <i className="bi bi-box-arrow-in-right me-1"></i> Login
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary w-100 rounded-3 mt-2"
                onClick={() => navigate(-1)}
              >
                <i className="bi bi-arrow-left me-1"></i> Kembali
              </button>
              <div className="text-center mt-3 small">
                Belum punya akun? <a href="/register">Daftar</a>
              </div>
            </form>
            <p className="text-center mt-4 text-muted small">
              © {new Date().getFullYear()} Courses App
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
