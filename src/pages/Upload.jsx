import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Upload() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);
  const [semester, setSemester] = useState("");

const saveNote = () => {
  if (!file) {
    alert("Please upload a file");
    return;
  }

  const fileURL = URL.createObjectURL(file); // 👈 IMPORTANT

  const oldNotes = JSON.parse(localStorage.getItem("notes")) || [];

  oldNotes.push({
    title,
    subject,
    semester,
    fileName: file.name,
    fileType: file.type,
    fileURL: fileURL,   // 👈 store preview URL
    uploadedAt: new Date().toLocaleString(),
  });

  localStorage.setItem("notes", JSON.stringify(oldNotes));
  navigate("/notes");
};


  return (
    <div className="fade-in" style={{ padding: "40px", maxWidth: "600px", margin: "auto" }}>
      <h2>Upload Notes</h2>

      <input className="form-control mb-2" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />

      <select className="form-control mb-2" onChange={(e) => setSubject(e.target.value)}>
        <option>Select Subject</option>
        <option>DBMS</option>
        <option>OS</option>
        <option>CN</option>
        <option>Java</option>
      </select>
       
       <select
  className="form-control mb-2"
  onChange={(e) => setSemester(e.target.value)}
>
  <option value="">Select Semester</option>
  <option>1</option>
  <option>2</option>
  <option>3</option>
  <option>4</option>
  <option>5</option>
  <option>6</option>
  <option>7</option>
  <option>8</option>
</select>



      <input
        type="file"
        className="form-control mb-3"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button className="btn-main w-100" onClick={saveNote}>
        Upload File
      </button>
    </div>
  );
}

export default Upload;
