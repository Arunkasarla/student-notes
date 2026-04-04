import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    roll: "",
    email: "",
    password: "",
    department: "",
    semester: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const signup = async () => {
  // Validation checks
  if (!form.name.trim()) {
    alert("Name is required");
    return;
  }
  if (!form.roll.trim()) {
    alert("Roll number is required");
    return;
  }
  if (!form.email.trim()) {
    alert("Email is required");
    return;
  }
  // More robust email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email)) {
    alert("Please enter a valid email address");
    return;
  }
  if (!form.password) {
    alert("Password is required");
    return;
  }
  // Password strength validation
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(form.password)) {
    alert("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character");
    return;
  }
  if (!form.department) {
    alert("Please select a department");
    return;
  }
  if (!form.semester) {
    alert("Please select a semester");
    return;
  }

  try {
    console.log("Sending data:", form);  // 👈 DEBUG

    const res = await fetch("http://localhost/notes-api/register.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    console.log("Response:", data); // 👈 DEBUG

    if (data.message === "User registered") {
      alert("Signup successful ✅");
      navigate("/login");
    } else {
      alert("Signup failed ❌");
    }

  } catch (error) {
    console.error("ERROR:", error);
    alert("Server error ❌");
  }
};

 // const signup = () => {
// localStorage.setItem("student", JSON.stringify(form));
//  alert("Signup successful!");
//  navigate("/login");
//};

  return (
    <div  className="fade-in" style={{ maxWidth: "500px", margin: "50px auto" ,background: "white",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 10px 20px rgba(0,0,0,0.1)", }}>
      <h2>Student Registration</h2>

      Enter your name:<input className="form-control mb-2" name="name" placeholder="Full Name" onChange={handleChange} /> <br/>
      Rollnumber:<input className="form-control mb-2" name="roll" placeholder="Roll Number" onChange={handleChange} /> <br/>
      College:<input className="form-control mb-2" name="email" placeholder="example@gmail.com" onChange={handleChange} /> <br/>
      Password:<input className="form-control mb-2" type="password" name="password" placeholder="Password" onChange={handleChange} /> <br/>

      Choose Branch:  <select className="form-control mb-2" name="department" onChange={handleChange}><br/>
        <option value="">Select Department</option><br/>
        <option>CSD</option>
        <option>CSE</option>
        <option>ECE</option>
        <option>EEE</option>
        <option>IT</option>
      </select><br/>

     Choose semester: <select className="form-control mb-3" name="semester" onChange={handleChange}><br/>
        <option value="">Select Semester</option>
        <option>1</option><option>2</option><option>3</option>
        <option>4</option><option>5</option><option>6</option>
        <option>7</option><option>8</option>
      </select>
      <br/>
      <button className="btn-main w-100" type="button" onClick={signup}>
        Register
      </button>
    </div>
  );
}

export default Signup;
