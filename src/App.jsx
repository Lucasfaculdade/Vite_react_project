
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Reports from './pages/Reports';
import Navbar from './components/Navbar';

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/tasks" element={<Tasks />}/>
        <Route path="/reports" element={<Reports />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
