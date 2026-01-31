import { Link, useNavigate } from "react-router-dom";

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const student = JSON.parse(localStorage.getItem("student"));

  const logout = () => {
    localStorage.removeItem("user");
    onClose();
    navigate("/login");
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
        ></div>
      )}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Profile section */}
        <div className="sidebar-profile">
          <div className="avatar">👤</div>
          <h4>{student?.name}</h4>
          <p>{student?.roll}</p>
          <p>
            {student?.department} • Sem {student?.semester}
          </p>
        </div>

        {/* Menu */}
        <nav className="sidebar-menu">
          <Link to="/" onClick={onClose}>🏠 Home</Link>
          <Link to="/notes" onClick={onClose}>📄 Notes</Link>
          <Link to="/upload" onClick={onClose}>⬆ Upload</Link>
          <Link to="/profile" onClick={onClose}>👤 Profile</Link>

          <button className="logout-btn" onClick={logout}>
            🚪 Logout
          </button>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
