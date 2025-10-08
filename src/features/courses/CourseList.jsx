import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { fetchCourses, deleteCourse } from './courseSlice'
import { motion } from 'framer-motion'
import Swal from 'sweetalert2'

function CourseList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { list, status, error } = useSelector((state) => state.courses)
  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated)
  const [query, setQuery] = useState('')

  useEffect(() => {
    dispatch(fetchCourses())
  }, [dispatch])

  if (error) return <div className="alert alert-danger">{error}</div>

  const handleDelete = async (id) => {
    const res = await Swal.fire({
      icon: 'warning',
      title: 'Hapus kursus ini?',
      text: 'Tindakan ini tidak dapat dibatalkan.',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus',
      cancelButtonText: 'Batal'
    })
    if (res.isConfirmed) {
      await dispatch(deleteCourse(id))
      Swal.fire({ icon: 'success', title: 'Berhasil dihapus', timer: 1000, showConfirmButton: false })
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return list
    return list.filter((c) =>
      `${c.title || c.name || ''} ${c.description || ''} ${c.category || ''}`.toLowerCase().includes(q)
    )
  }, [list, query])

  return (
    <div>
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2 mb-3">
        <h2 className="mb-0">Daftar Kursus</h2>
        <div className="d-flex gap-2 w-100 w-md-auto">
          <div className="input-group">
            <span className="input-group-text"><i className="bi bi-search" /></span>
            <input
              className="form-control"
              placeholder="Cari judul, kategori, atau deskripsi"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          {isAuthenticated && (
            <button className="btn btn-primary" onClick={() => navigate('/courses/new')}>
              <i className="bi bi-plus-circle me-1" /> Tambah Kursus
            </button>
          )}
        </div>
      </div>

      {status === 'loading' ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="alert alert-info">Tidak ada kursus ditemukan. Coba tambah kursus baru.</div>
      ) : (
        <div className="row g-3">
        {filtered.map((course) => (
          <div key={course.id} className="col-12 col-md-6 col-lg-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="card h-100 shadow-sm card-hover">
              {course.coverUrl ? (
                <img src={course.coverUrl} alt={course.title} className="card-img-top cover-img" />
              ) : null}
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <h5 className="card-title mb-2">{course.title || course.name}</h5>
                  {course.category && <span className="badge text-bg-light">{course.category}</span>}
                </div>
                {course.price != null && (
                  <div className="mb-2"><span className="badge text-bg-success">Rp {Number(course.price).toLocaleString('id-ID')}</span></div>
                )}
                <p className="card-text text-muted text-clamp-2">
                  {course.description || 'Deskripsi tidak tersedia'}
                </p>
                <div className="d-flex flex-wrap gap-2">
                  <Link to={`/courses/${course.id}`} className="btn btn-outline-primary">
                    Detail
                  </Link>
                  {isAuthenticated && (
                    <>
                      <Link to={`/courses/${course.id}/edit`} className="btn btn-outline-secondary">
                        Edit
                      </Link>
                      <button onClick={() => handleDelete(course.id)} className="btn btn-outline-danger">
                        Hapus
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
      )}

      {!isAuthenticated && (
        <div className="alert alert-warning mt-3">
          Anda belum login. CRUD (tambah, edit, hapus) hanya tersedia setelah login.
        </div>
      )}
    </div>
  )
}

export default CourseList