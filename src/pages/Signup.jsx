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
const signup = () => {
  if (!form.email.endsWith("@gmail.com")) {
    alert("Please use a valid Gmail address");
    return;
  }

  localStorage.setItem("student", JSON.stringify(form));
  alert("Signup successful! Please login.");
  navigate("/login");
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
      <button className="btn-main w-100" onClick={signup}>
        Register
      </button>
    </div>
  );
}

export default Signup;
