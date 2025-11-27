import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import CreatePage from "./pages/CreatePage";
import EditePage from "./pages/EditePage";
import Favourite from "./pages/Favourite";
import { AuthProvider } from "./context/UserContext";
import ProtectedRoute from "./component/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Create"
          element={
            <ProtectedRoute>
              <CreatePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Favourite"
          element={
            <ProtectedRoute>
              <Favourite />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Edit"
          element={
            <ProtectedRoute>
              <EditePage />
            </ProtectedRoute>
          }
        />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
    </AuthProvider>
  );
}

export default App;
