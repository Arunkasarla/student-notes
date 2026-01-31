import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Notes from "./pages/Notes";
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";
import NoteDetails from "./pages/NoteDetails";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = localStorage.getItem("user");
 // const user = localStorage.getItem("user");

if (user) {
  document.body.classList.add("logged-in");
} else {
  document.body.classList.remove("logged-in");
}

  return (
    <BrowserRouter>
      <div className="app-layout">
        {/* Navbar always visible */}
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Sidebar only after login */}
        {user && (
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
   <main className="main-content">

          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/notes" element={<Notes />} />
            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <Upload />
                </ProtectedRoute>
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notes/:id" element={<NoteDetails />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
