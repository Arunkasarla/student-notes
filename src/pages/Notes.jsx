import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [semesterFilter, setSemesterFilter] = useState("All");

  useEffect(() => {
  fetch("https://studentnotes.fwh.is/get_notes.php")
    .then(res => res.json())
    .then(data => setNotes(data))
    .catch(err => console.error(err));
}, []);

 // const deleteNote = (index) => {
   // const updated = notes.filter((_, i) => i !== index);
   // setNotes(updated);
   // localStorage.setItem("notes", JSON.stringify(updated));
 //}; };

  const filteredNotes = notes.filter((note) => {
    const matchesTitle = note.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesSubject =
      subjectFilter === "All" || note.subject === subjectFilter;

    const matchesSemester =
      semesterFilter === "All" || note.semester === semesterFilter;

    return matchesTitle && matchesSubject && matchesSemester;
  });

  return (
    <div className="page-container fade-in">
      <h2>Available Notes</h2>

      {/* SEARCH & FILTERS */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "25px",
          flexWrap: "wrap",
        }}
      >
        <input
          className="form-control"
          placeholder="Search by title"
          style={{ maxWidth: "220px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="form-control"
          style={{ maxWidth: "200px" }}
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
        >
          <option value="All">All Subjects</option>
          <option>DBMS</option>
          <option>OS</option>
          <option>CN</option>
          <option>Java</option>
        </select>

        <select
          className="form-control"
          style={{ maxWidth: "200px" }}
          value={semesterFilter}
          onChange={(e) => setSemesterFilter(e.target.value)}
        >
          <option value="All">All Semesters</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
        </select>
      </div>

      {/* NOTES GRID */}
      {filteredNotes.length === 0 && (
        <p style={{ color: "gray" }}>No notes found.</p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredNotes.map((note, index) => (
          <div className="card-custom" key={index} style={{ padding: "20px" }}>
            <h4>{note.title}</h4>

            <p><b>Subject:</b> {note.subject}</p>
            <p><b>Semester:</b> {note.semester}</p>

          <p>
  <b>File:</b>{" "}
  <a href={`http://localhost/notes-api/${note.file_path}`} target="_blank">
    View File 📄
  </a>
</p>

            <Link
              to={`/notes/${index}`}
              className="btn-main"
              style={{ marginRight: "10px" }}
            >
              View
            </Link>

            <button
              className="btn-main"
              style={{ background: "#d32f2f" }}
              //onClick={() => deleteNote(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;
