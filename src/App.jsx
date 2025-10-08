import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import RequireAuth from './components/RequireAuth'
import Footer from './components/Footer'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import LoginPage from './features/auth/LoginPage'
import RegisterPage from './features/auth/RegisterPage'
import CourseList from './features/courses/CourseList'
import CourseDetail from './features/courses/CourseDetail'
import CourseForm from './features/courses/CourseForm'

function AppShell() {
  const location = useLocation()
  const hideNavbar = ['/login', '/register'].includes(location.pathname)
  return (
    <div className="d-flex flex-column min-vh-100">
      {!hideNavbar && <Navbar />}
      <main className="flex-grow-1 container-fluid px-3 px-md-5 py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/new" element={<RequireAuth><CourseForm /></RequireAuth>} />
          <Route path="/courses/:id/edit" element={<RequireAuth><CourseForm /></RequireAuth>} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}

export default App
