import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Pages
import CalendarPage from './pages/CalendarPage'
import MealsPage from './pages/MealsPage'
import LoginPage from './pages/LoginPage'
import QRCodePage from './pages/QRCodePage'

// Components
import Sidebar from './components/Sidebar'

const DummyComponent = () => {
  return <h1 style={{ padding: '1.25rem 1.5rem ' }}>Not implemented Yet</h1>
}

const MainComponent = () => {
  const [token, setToken] = useState(localStorage.getItem('token'))

  const handleLogin = (token) => {
    setToken(token)
    localStorage.setItem('token', token, 1000 * 60 * 60 * 4)
  }

  const handleLogout = () => {
    setToken(null)
    localStorage.removeItem('token')
  }

  if (!token) {
    return <LoginPage handleLogin={handleLogin} />
  }

  return (
    <>
      <div className="grid-container">
        <Sidebar handleLogout={handleLogout} />

        <Routes>
          <Route exact path="/" element={<CalendarPage />} />
          <Route exact path="/meals" element={<MealsPage />} />
          <Route path="/today/:id" element={<QRCodePage />} />
          <Route path="*" element={<DummyComponent />} />
        </Routes>
      </div>
    </>
  )
}

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="*" element={<MainComponent />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
