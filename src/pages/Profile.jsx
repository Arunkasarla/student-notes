function Profile() {
  const student = JSON.parse(localStorage.getItem("student"));

  if (!student) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h3>No student data found</h3>
        <p>Please login again.</p>
      </div>
    );
  }

  return (
    <div className="fade-in"
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        background: "white",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "#6f2da8" }}>
        Student Profile
      </h2>

      <p><b>Name:</b> {student.name}</p>
      <p><b>Roll Number:</b> {student.roll}</p>
      <p><b>Email:</b> {student.email}</p>
      <p><b>Department:</b> {student.department}</p>
      <p><b>Semester:</b> {student.semester}</p>
    </div>
  );
}

export default Profile;
