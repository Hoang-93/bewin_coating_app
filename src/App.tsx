import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from './pages/DashBoard/Home';
import AppLayout from './layout/AppLayout';
import Calendar from './pages/Calendar';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<AppLayout/>} >
          <Route path="/" element={<Home />} />

          <Route path="/calendar" element={<Calendar />} />
         </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
