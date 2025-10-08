import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { createCourse, updateCourse, setCourseCover } from './courseSlice'

function CourseForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const course = useSelector((s) => s.courses.list.find((c) => String(c.id) === String(id)))

  const [form, setForm] = useState({ title: '', description: '', price: 0, category: '' })
  const [coverFile, setCoverFile] = useState(null)

  useEffect(() => {
    if (isEdit && course) {
      setForm({
        title: course.title || '',
        description: course.description || '',
        price: course.price || 0,
        category: course.category || '',
      })
    }
  }, [isEdit, course])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: name === 'price' ? Number(value) : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title) return

    if (isEdit) {
      await dispatch(updateCourse({ id, changes: form }))
      if (coverFile) await dispatch(setCourseCover({ id, file: coverFile }))
    } else {
      const res = await dispatch(createCourse(form))
      const newId = res.payload?.id
      if (coverFile && newId) await dispatch(setCourseCover({ id: newId, file: coverFile }))
    }
    navigate('/courses')
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-6">
            <div className="card shadow border-0 rounded-4">
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 text-center fw-bold text-primary">
                  {isEdit ? 'Ubah Kursus' : 'Tambah Kursus Baru'}
                </h3>

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-semibold">Judul</label>
                      <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="form-control form-control-lg rounded-3"
                        placeholder="Contoh: Dasar React untuk Pemula"
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold">Deskripsi</label>
                      <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="form-control rounded-3"
                        rows={4}
                        placeholder="Ringkasan materi, target peserta, dsb."
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold">Kategori</label>
                      <input
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="form-control rounded-3"
                        placeholder="Misal: Programming"
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold">Harga (Rp)</label>
                      <input
                        name="price"
                        type="number"
                        min="0"
                        value={form.price}
                        onChange={handleChange}
                        className="form-control rounded-3"
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold">Cover / Gambar</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                        className="form-control rounded-3"
                      />
                    </div>
                  </div>

                  <div className="d-flex justify-content-between mt-4 flex-column flex-sm-row gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-secondary w-100 w-sm-auto"
                      onClick={() => navigate(-1)}
                    >
                      <i className="bi bi-arrow-left me-1" />
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary w-100 w-sm-auto shadow-sm"
                    >
                      <i className="bi bi-save me-1" /> Simpan
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <p className="text-center text-muted small mt-4 mb-0">
              © {new Date().getFullYear()} Courses App 
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseForm
