import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const login = async () => {
  try {
    console.log("Trying login...");

    const res = await fetch("http://127.0.0.1/notes-api/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log("Response status:", res.status);

   // const data = await res.json();
    const text = await res.text();
    console.log("RAW RESPONSES:", text);
    const data = JSON.parse(text);

    console.log("Response data:", data);

    if (data.message === "Login success") {
      alert("Login successful ✅");
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/notes");
    } else {
      alert("Invalid credentials ❌");
    }
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    alert("Server error ❌");
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
