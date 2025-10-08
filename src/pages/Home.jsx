import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="text-center">
      <h1 className="mb-3">Selamat datang di Courses</h1>
      <p className="text-muted">Aplikasi ReactJS terhubung ke Open API Delcom</p>
      <p className="text-muted">Porman Marsaulina Simanjuntak — NIM 11S24057</p>
      <div className="mt-4">
        <Link className="btn btn-primary me-2" to="/courses">
          <i className="bi bi-journal-text me-1"></i>
          Lihat Courses
        </Link>
        <Link className="btn btn-outline-secondary" to="/login">
          <i className="bi bi-box-arrow-in-right me-1"></i>
          Login
        </Link>
      </div>
    </div>
  )
}

export default Home