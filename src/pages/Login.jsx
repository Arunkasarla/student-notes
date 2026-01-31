import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const student = JSON.parse(localStorage.getItem("student"));

    if (student && student.email === email && student.password === password) {
      localStorage.setItem("user", email);
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="fade-in" style={{ 
        maxWidth: "400px", margin: "60px auto",background: "white",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 10px 20px rgba(0,0,0,0.1)", }}>
      <h2>Student Login</h2>

      <input
        className="form-control mb-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="form-control mb-3"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn-main w-100" onClick={login}>
        Login
      </button>

      <p style={{ marginTop: "15px" }}>
      New student?{" "}
      <span
        style={{ color: "#ff7a00", cursor: "pointer" }}
        onClick={() => navigate("/signup")}
      >
        Create an account
      </span>
    </p>

    </div>
  );
}

export default Login;
