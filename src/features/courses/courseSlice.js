import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { sampleCourses } from './sampleData'
import {
  seedIfEmpty,
  getCourses as storageGetCourses,
  getCourseById as storageGetCourseById,
  createCourse as storageCreateCourse,
  updateCourse as storageUpdateCourse,
  deleteCourse as storageDeleteCourse,
  setCoverFromFile as storageSetCoverFromFile,
  enrollStudent as storageEnrollStudent,
  rateCourse as storageRateCourse,
} from '../../services/courseStorage'

const BASE_URL = import.meta.env.VITE_DELCOM_BASEURL || 'https://open-api.delcom.org/api/v1'
const TOKEN = import.meta.env.VITE_DELCOM_TOKEN || ''

export const fetchCourses = createAsyncThunk('courses/fetchAll', async () => {
  try {
    const res = await fetch(`${BASE_URL}/courses`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
      },
    })
    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Status ${res.status} ${res.statusText}: ${text.slice(0, 180)}`)
    }
    const data = await res.json()
    // Beberapa API menggunakan field berbeda; fallback ke berbagai kemungkinan
    return data?.data || data?.items || data?.results || []
  } catch (err) {
    if (String(err.message).includes('401') || /autentikasi/i.test(err.message)) {
      seedIfEmpty(sampleCourses)
      return storageGetCourses()
    }
    throw new Error(`Gagal mengambil data courses. Detail: ${err.message}`)
  }
})

export const fetchCourseById = createAsyncThunk('courses/fetchById', async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/courses/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
      },
    })
    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Status ${res.status} ${res.statusText}: ${text.slice(0, 180)}`)
    }
    const data = await res.json()
    return data?.data || data?.item || data || null
  } catch (err) {
    if (String(err.message).includes('401') || /autentikasi/i.test(err.message)) {
      return storageGetCourseById(id)
    }
    throw new Error(`Gagal mengambil detail course. Detail: ${err.message}`)
  }
})

// Local CRUD thunks
export const createCourse = createAsyncThunk('courses/create', async (payload) => {
  return storageCreateCourse(payload)
})

export const updateCourse = createAsyncThunk('courses/update', async ({ id, changes }) => {
  return storageUpdateCourse(id, changes)
})

export const deleteCourse = createAsyncThunk('courses/delete', async (id) => {
  await storageDeleteCourse(id)
  return id
})

export const setCourseCover = createAsyncThunk('courses/setCover', async ({ id, file }) => {
  return storageSetCoverFromFile(id, file)
})

export const enrollStudent = createAsyncThunk('courses/enroll', async ({ id, student }) => {
  return storageEnrollStudent(id, student)
})

export const addRating = createAsyncThunk('courses/rate', async ({ id, rating }) => {
  return storageRateCourse(id, rating)
})

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    list: [],
    selected: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchCourseById.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.selected = action.payload
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      // CRUD reducers
      .addCase(createCourse.fulfilled, (state, action) => {
        state.list.push(action.payload)
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        const idx = state.list.findIndex((c) => String(c.id) === String(action.payload.id))
        if (idx !== -1) state.list[idx] = action.payload
        if (state.selected && String(state.selected.id) === String(action.payload.id)) {
          state.selected = action.payload
        }
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.list = state.list.filter((c) => String(c.id) !== String(action.payload))
        if (state.selected && String(state.selected.id) === String(action.payload)) {
          state.selected = null
        }
      })
      .addCase(setCourseCover.fulfilled, (state, action) => {
        const idx = state.list.findIndex((c) => String(c.id) === String(action.payload.id))
        if (idx !== -1) state.list[idx] = action.payload
        if (state.selected && String(state.selected.id) === String(action.payload.id)) {
          state.selected = action.payload
        }
      })
      .addCase(enrollStudent.fulfilled, (state, action) => {
        const idx = state.list.findIndex((c) => String(c.id) === String(action.payload.id))
        if (idx !== -1) state.list[idx] = action.payload
        if (state.selected && String(state.selected.id) === String(action.payload.id)) {
          state.selected = action.payload
        }
      })
      .addCase(addRating.fulfilled, (state, action) => {
        const idx = state.list.findIndex((c) => String(c.id) === String(action.payload.id))
        if (idx !== -1) state.list[idx] = action.payload
        if (state.selected && String(state.selected.id) === String(action.payload.id)) {
          state.selected = action.payload
        }
      })
  },
})

export default courseSlice.reducer