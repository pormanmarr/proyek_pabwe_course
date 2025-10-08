import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchCourseById, enrollStudent, addRating } from './courseSlice'

function CourseDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { selected, status, error } = useSelector((state) => state.courses)
  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated)
  const [student, setStudent] = useState({ name: '', email: '' })
  const [rating, setRating] = useState({ score: 5, comment: '' })

  useEffect(() => {
    dispatch(fetchCourseById(id))
  }, [dispatch, id])

  if (status === 'loading') return (
    <div className="d-flex justify-content-center my-5">
      <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
    </div>
  )
  if (error) return <div className="alert alert-danger">{error}</div>
  if (!selected) return <div className="alert alert-warning">Data tidak ditemukan.</div>

  return (
    <div className="container-fluid bg-light min-vh-100 py-3 py-md-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            <div className="card shadow-sm mb-4 border-0 rounded-4 overflow-hidden">
              {selected.coverUrl ? (
                <img
                  src={selected.coverUrl}
                  alt={selected.title}
                  className="img-fluid w-100"
                  style={{ maxHeight: '300px', objectFit: 'cover' }}
                />
              ) : null}
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start">
                      <h3 className="card-title mb-2">{selected.title || selected.name}</h3>
                      {selected.category && <span className="badge text-bg-light">{selected.category}</span>}
                    </div>
                    {selected.price != null && (
                      <div className="mb-2"><span className="badge text-bg-success">Rp {Number(selected.price).toLocaleString('id-ID')}</span></div>
                    )}
                    <p className="card-text">{selected.description || 'Tidak ada deskripsi.'}</p>
                  </div>
                  <div className="d-flex gap-2">
                    <Link className="btn btn-outline-secondary" to={`/courses/${selected.id}/edit`}>
                      Edit
                    </Link>
                    <Link className="btn btn-outline-primary" to={`/courses`}>
                      Kembali
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="row g-4">
              <div className="col-12 col-md-6">
                <div className="card border-0 shadow-sm rounded-4 h-100">
                  <div className="card-body">
                    <h5 className="fw-semibold mb-3">Tambah Siswa ke Kursus</h5>
                    <div className="mb-2">
                      <input className="form-control" placeholder="Nama" value={student.name} onChange={(e) => setStudent((s) => ({ ...s, name: e.target.value }))} disabled={!isAuthenticated} />
                    </div>
                    <div className="mb-2">
                      <input className="form-control" placeholder="Email" value={student.email} onChange={(e) => setStudent((s) => ({ ...s, email: e.target.value }))} disabled={!isAuthenticated} />
                    </div>
                    <button className="btn btn-success" disabled={!isAuthenticated} onClick={() => dispatch(enrollStudent({ id, student }))}>Tambah</button>
                    {!isAuthenticated && (
                      <div className="alert alert-warning mt-2">Login untuk menambah siswa ke kursus.</div>
                    )}

                    <hr />
                    <h6 className="mt-3">Siswa Terdaftar</h6>
                    <ul className="list-group">
                      {(selected.students || []).map((s, idx) => (
                        <li key={idx} className="list-group-item d-flex justify-content-between">
                          <span>{s.name} — {s.email}</span>
                          <span className="text-muted">Terdaftar</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="card border-0 shadow-sm rounded-4 h-100">
                  <div className="card-body">
                    <h5 className="fw-semibold mb-3">Rating Kursus</h5>
                    <div className="mb-2">
                      <select className="form-select" value={rating.score} onChange={(e) => setRating((r) => ({ ...r, score: Number(e.target.value) }))} disabled={!isAuthenticated}>
                        {[1,2,3,4,5].map((v) => (
                          <option key={v} value={v}>{v} ⭐</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-2">
                      <textarea className="form-control" value={rating.comment} onChange={(e) => setRating((r) => ({ ...r, comment: e.target.value }))} placeholder="Komentar" disabled={!isAuthenticated} />
                    </div>
                    <button className="btn btn-primary" disabled={!isAuthenticated} onClick={() => dispatch(addRating({ id, rating }))}>Kirim Rating</button>
                    {!isAuthenticated && (
                      <div className="alert alert-warning mt-2">Login untuk mengirim rating.</div>
                    )}

                    <hr />
                    <h6 className="mt-3">Daftar Rating</h6>
                    <ul className="list-group">
                      {(selected.ratings || []).map((rt, idx) => (
                        <li key={idx} className="list-group-item">
                          <strong>{rt.score} ⭐</strong>
                          <div className="text-muted">{rt.comment}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail