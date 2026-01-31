import { useParams } from "react-router-dom";

function NoteDetails() {
  const { id } = useParams();
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  const note = notes[id];

  if (!note) {
    return <h3 style={{ padding: "40px" }}>Note not found</h3>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>{note.title}</h2>
      <p><b>Subject:</b> {note.subject}</p>
      <p><b>Semester:</b> {note.semester}</p>
     <p>
  <b>File:</b>{" "}
  {note.fileType.includes("pdf") ? "📕 PDF File" : "📘 Word Document"}
</p>

      {/* 👇 FILE PREVIEW / OPEN */}
      <a
        href={note.fileURL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-main"
        style={{ marginTop: "15px", display: "inline-block" }}
      >
        View / Download File
      </a>
    </div>
  );
}

export default NoteDetails;
