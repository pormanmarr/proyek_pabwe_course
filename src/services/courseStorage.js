const KEY = 'courses_storage_v1'

function read() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    return []
  }
}

function write(courses) {
  localStorage.setItem(KEY, JSON.stringify(courses))
}

export function seedIfEmpty(sample) {
  const cur = read()
  if (!cur || cur.length === 0) {
    write(sample.map((c, idx) => ({
      id: c.id ?? idx + 1,
      title: c.title || c.name || 'Course',
      description: c.description || '',
      price: c.price ?? 0,
      coverUrl: c.coverUrl || '',
      students: [],
      ratings: [],
      category: c.category || '',
    })))
  }
}

export function getCourses() {
  return read()
}

export function getCourseById(id) {
  return read().find((c) => String(c.id) === String(id)) || null
}

export function createCourse(course) {
  const list = read()
  const id = course.id ?? (list.at(-1)?.id ?? 0) + 1
  const item = { id, title: '', description: '', price: 0, coverUrl: '', students: [], ratings: [], category: '', ...course }
  list.push(item)
  write(list)
  return item
}

export function updateCourse(id, changes) {
  const list = read()
  const idx = list.findIndex((c) => String(c.id) === String(id))
  if (idx === -1) return null
  list[idx] = { ...list[idx], ...changes }
  write(list)
  return list[idx]
}

export function deleteCourse(id) {
  const list = read().filter((c) => String(c.id) !== String(id))
  write(list)
}

export async function setCoverFromFile(id, file) {
  const toDataUrl = (f) => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(f)
  })
  const dataUrl = await toDataUrl(file)
  return updateCourse(id, { coverUrl: dataUrl })
}

export function enrollStudent(id, student) {
  const course = getCourseById(id)
  if (!course) return null
  const exists = course.students?.some((s) => s.email === student.email)
  if (!exists) {
    course.students = [...(course.students || []), student]
  }
  updateCourse(id, { students: course.students })
  return course
}

export function rateCourse(id, rating) {
  const course = getCourseById(id)
  if (!course) return null
  course.ratings = [...(course.ratings || []), rating]
  updateCourse(id, { ratings: course.ratings })
  return course
}