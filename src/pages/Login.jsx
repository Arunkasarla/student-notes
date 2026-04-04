import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const login = async () => {
  try {
    const res = await fetch("http://localhost/notes-api/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const text = await res.text();
    console.log("RAW:", text);

    if (!text) {
      alert("Empty response ❌");
      return;
    }

    const data = JSON.parse(text);

   if (data.message === "Login success") {
  localStorage.setItem("user", JSON.stringify(data.user)); // ✅ FIX
  alert("Login successful ✅");
  navigate("/notes");
}
     else {
      alert(data.message);
    }

  } catch (error) {
    console.error(error);
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
