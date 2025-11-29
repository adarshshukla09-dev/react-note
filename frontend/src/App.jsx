import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import EditePage from "./pages/EditePage"; // Make sure to use the correct casing if needed
import CreatePage from "./pages/CreatePage";
import Favourite from "./pages/Favourite";
import { AuthProvider } from "./context/UserContext";
import ProtectedRoute from "./component/ProtectedRoute";
import { NoteProvider } from "./context/NoteContext";
import { ThemeProvider } from "./context/ThemeContext";
function App() {
  return (
    <AuthProvider>
      <NoteProvider>
        <ThemeProvider>
          <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
          <Routes>
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
              path="/edit/:id" // ✏️ NEW: Edit Route
              element={
                <ProtectedRoute>
                  <EditePage path="/edit/:id" element={<EditePage/>} />
                </ProtectedRoute>
              }
            />
            <Route path="/Favourite" element={<Favourite />} />

            <Route path="/del/:id" />

            <Route path="/login" element={<Login />} />

            <Route path="/signup" element={<Signup />} />
          </Routes></div>
        </ThemeProvider>
      </NoteProvider>
    </AuthProvider>
  );
}

export default App;
