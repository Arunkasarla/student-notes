import { Link, useNavigate } from "react-router-dom";

function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="navbar-custom">
      {/* Left: Logo + Title */}
      <div className="navbar-left">
        {user && (
          <button className="hamburger-btn" onClick={onMenuClick}>
            ☰
          </button>
        )}

        <img src="/logo.png" alt="Logo" className="navbar-logo" />
        <span className="navbar-title">Student Notes</span>
      </div>

      {/* Center / Right: Links */}
      <nav className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/notes">Notes</Link>

        {user && <Link to="/upload">Upload</Link>}
        {user && <Link to="/profile">Profile</Link>}

        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/signup">Signup</Link>}

        {user && (
          <button className="logout-btn-nav" onClick={logout}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
