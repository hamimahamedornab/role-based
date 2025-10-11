import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // check if a user is already logged in
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (savedUser) setCurrentUser(savedUser);
  }, []);

  // logout function
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <Routes>
      {/* Signup Route */}
      <Route path="/" element={<Signup />} />

      {/* Login Route */}
      <Route
        path="/login"
        element={<Login setCurrentUser={setCurrentUser} />}
      />

      {/* Protected Dashboard Route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute currentUser={currentUser}>
            <Dashboard currentUser={currentUser} handleLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      {/* Redirect unmatched routes */}
      <Route path="*" element={<h2>404 - Page Not Found</h2>} />
    </Routes>
  );
};

export default App;
