
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Tasks from "./pages/Tasks";
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { isAuthenticated } from './services/authService';


function PrivateRoute({ children }){
  return isAuthenticated() ? children : <Navigate to="/login" />;
}


export default function App() {
  

  return (
    <BrowserRouter>
    {isAuthenticated() && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login/>}/>

        <Route path="/tasks" 
        element={
          <PrivateRoute>
            <Tasks/>
          </PrivateRoute>}
        />

        <Route path="/reports"
        element={
          <PrivateRoute>
            <div className="container mt-4">
              <h3>Reports (em breve)</h3>
            </div>
          </PrivateRoute>
        }
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}


