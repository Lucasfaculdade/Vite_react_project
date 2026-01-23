import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";

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
        <Route path="/login" element={<Login />} />

        <Route path="/tasks" element={ user ? <Tasks /> : <Navigate to="/login" />} />

        <Route path="*" element={ <Navigate to="/login"/> } />

        <Route path="/dashboard" element={ user ? <Dashboard /> : <Navigate to="/login" />}/>
      </Routes>
    </>
  );
}