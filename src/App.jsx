
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Reports from './pages/Reports';
import Navbar from './components/Navbar';
import Login from './pages/login';
import Logout from './pages/Logout';
import PrivateRoute from './routes/PrivateRoute';


function App() {
  

  return (
    <BrowserRouter>
     <Navbar />
      <main className="container mt-5 pt-4">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/logout" element={<Logout />} />
          <Route path="/tasks" element={<PrivateRoute><Tasks /></PrivateRoute>}/>
          <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
