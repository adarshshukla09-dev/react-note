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
import { NoteProvider } from "./context/NoteContext";
function App() {
  return (
    <AuthProvider>
      <NoteProvider>     {/* <-- wrap ALL routes once here */}

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
            path="/Favourite"
            element={
          
                <Favourite />
              
            }
          />

          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditePage />
              </ProtectedRoute>
            }
          />
             <Route
            path="/del/:id"
          
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>

      </NoteProvider>
    </AuthProvider>
  );
}


export default App;
