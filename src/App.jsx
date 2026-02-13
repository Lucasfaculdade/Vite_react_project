import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
  const { user, loading } = useAuth();

  if(loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  return (
    <>
      { user && <Navbar /> }
      <Routes>
        <Route 
          path="/login" 
          element={!user ? <Login /> : <Navigate to="/dashboard" />} 
        />

        <Route 
          path="/tasks" 
          element={ user ? <Tasks /> : <Navigate to="/login" />} 
        />
        
       <Route 
        path="/dashboard" 
        element={
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
        } 
       />

        <Route 
          path="*" 
          element={ <Navigate to={ user ? "/dashboard" : "/login" }/> } 
        />

      </Routes>
    </>
  );
}