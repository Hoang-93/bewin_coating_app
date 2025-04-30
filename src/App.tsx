import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from './pages/DashBoard/Home';
import AppLayout from './layout/AppLayout';
import Calendar from './pages/Calendar';
import NotFound from './pages/OtherPages/NotFound';
import UserProfile from './pages/UserProfiles';
import BasicTables from './pages/Tables/ListData';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<AppLayout/>} >
          <Route path="/" element={<Home />} />

          <Route path="/calendar" element={<Calendar />} />
          
          <Route path="/profile" element={< UserProfile/>} />

          <Route path="/list-data" element={< BasicTables/>} />
         </Route>


         {/* Fallback Route */}
         <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
