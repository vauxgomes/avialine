import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Pages
import CalendarPage from './pages/CalendarPage'
import MealsPage from './pages/MealsPage'
import LoginPage from './pages/LoginPage'

// Components
import Sidebar from './components/Sidebar'
import QRCodePage from './pages/QRCodePage'

const DummyComponent = () => {
  return <h1>Dummy Component</h1>
}

const MainComponent = () => {
  const [token, setToken] = useState('set')

  if (!token) {
    return <LoginPage setToken={setToken} />
  }

  return (
    <>
      <div className="grid-container">
        <Sidebar setToken={setToken} />

        <Routes>
          <Route exact path="/" element={<CalendarPage />} />
          <Route exact path="/meals" element={<MealsPage />} />
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
        <Route exact path="/today" element={<QRCodePage />} />
        <Route path="*" element={<MainComponent />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
