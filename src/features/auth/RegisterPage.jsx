import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function RegisterPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !password || !confirmPassword) {
      Swal.fire({ icon: 'error', title: 'Registrasi gagal', text: 'Semua field wajib diisi.' })
      return
    }
    if (password !== confirmPassword) {
      Swal.fire({ icon: 'error', title: 'Registrasi gagal', text: 'Konfirmasi password tidak cocok.' })
      return
    }
    Swal.fire({ icon: 'success', title: 'Registrasi berhasil', text: 'Silakan login dengan akun Anda.', timer: 1500, showConfirmButton: false })
    navigate('/login')
  }

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="w-100" style={{ maxWidth: 420 }}>
        <div className="card shadow border-0 mx-auto rounded-4">
          <div className="card-body p-4">
            <h3 className="text-center fw-bold text-primary mb-3">Daftar Akun</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Nama Lengkap</label>
                <input type="text" className="form-control rounded-3" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama Anda" />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input type="email" className="form-control rounded-3" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@gmail.com" />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>
                <div className="input-group">
                  <input type={showPassword ? 'text' : 'password'} className="form-control rounded-3" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimal 6 karakter" />
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword((v) => !v)} aria-label="Tampilkan/sembunyikan password">
                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </button>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Konfirmasi Password</label>
                <input type={showPassword ? 'text' : 'password'} className="form-control rounded-3" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Ulangi password" />
              </div>
              <button className="btn btn-primary w-100 rounded-3" type="submit">
                <i className="bi bi-person-plus me-1"></i> Daftar
              </button>
              <button type="button" className="btn btn-outline-secondary w-100 rounded-3 mt-2" onClick={() => navigate(-1)}>
                <i className="bi bi-arrow-left me-1"></i> Kembali
              </button>
            </form>
            <p className="text-center mt-3 text-muted small">
              Sudah punya akun? <a href="/login">Masuk</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage