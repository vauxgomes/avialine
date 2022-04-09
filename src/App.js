import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// Pages
import CalendarPage from './pages/CalendarPage'
import MealsPage from './pages/MealsPage'

// Components
import Sidebar from './components/Sidebar'

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="grid-container">
        <Sidebar />
        <Routes>
          <Route exact path="/" element={<CalendarPage />} />
          <Route exact path="/meals" element={<MealsPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
