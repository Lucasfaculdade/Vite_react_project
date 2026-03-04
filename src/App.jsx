
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Tasks from "./pages/Tasks";
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext';
import Register from './pages/Register';


function PrivateRoute({ children }){
  const { authenticated, loading } = useAuth();

  if(loading) return <div className="text-center mt-5"><div className="spinner-border"/></div>;
  
  return authenticated ? children : <Navigate to="/login" />;
}


export default function App() {
  
  const { user, loading } = useAuth();

  if(loading){
    return <div className="text-center mt-5"><div className="spinner-border text-primary"/></div>;
  }

  return (
    <BrowserRouter>
      {user && <Navbar />}

      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/tasks" />}/>

        <Route path="/register" element={!user ? <Register /> : <Navigate to="/tasks" />} />

        <Route path="/tasks" element={ 
          <PrivateRoute>
            <Tasks />
          </PrivateRoute> 
        }
        />
        
        <Route path="/reports" element={
            <PrivateRoute>
              <div className="container mt-4">
                <h3>Reports (Em breve)</h3>
              </div>
            </PrivateRoute>
        }
        />

        <Route path="*" element={<Navigate to={user ? "/tasks" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}


