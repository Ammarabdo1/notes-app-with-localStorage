import { useState, useEffect } from "react";
import "./App.css";
import Preview from "./Components/Preview";

import { styled } from "@mui/system";

import ClearIcon from "@mui/icons-material/Clear";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

import AOS from "aos";
import "aos/dist/aos.css";
import Message from "./Components/Message";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNode, setSelectedNode] = useState(null);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(false);
  const [showAddSuccessfully, setShowAddSuccessfully] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("notes")) {
      setNotes(JSON.parse(localStorage.getItem("notes")));
      // localStorage.clear()
      return;
    }
    localStorage.setItem("notes", JSON.stringify([]));
  }, []);

  AOS.init();

  const saveInLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  //! to save new note
  const handleSaveNotes = () => {
    if (editing) {
      updateNotes();
      return;
    }
    const note = {
      title: title,
      content: content,
      id: Date.now(),
    };
    const newNots = [...notes, note];
    saveInLocalStorage("notes", newNots);
    setNotes(newNots);
    setSelectedNode(note.id);

    setCreating(false);
    setTitle("");
    setContent("");

    setShowAddSuccessfully(true);
    setTimeout(() => setShowAddSuccessfully(false), 2000);
  };

  //! to edit for any note
  const updateNotes = () => {
    const note = notes.find((note) => note.id === selectedNode);
    note.title = title;
    note.content = content;
    saveInLocalStorage("notes", notes);
    setTitle("");
    setContent("");
    setEditing(false);
  };

  //! to remover note
  const removeNote = () => {
    const notesAfterDelete = notes.filter((note) => note.id !== selectedNode);
    saveInLocalStorage("notes", notesAfterDelete);
    setNotes(notesAfterDelete);
    setSelectedNode(null);
  };

  const getAddNote = () => {
    const CustomClearIcon = styled(ClearIcon)`
      color: red;
      font-size: 2rem;
      position: absolute;
      top: -15px;
      left: -60px;
      box-shadow: 0 0 10px 2px #5c5c5cab;
      transition: all 0.1s ease;
      &:hover {
        transition: all 0.3s ease;
        transform: scale(1.1);
      }
      cursor: pointer;
    `;
    return (
      <div
        data-aos="fade-left"
        data-aos-anchor-placement="center-bottom"
        style={{ position: "relative" }}
      >
        <h2>إضافة ملاحظة جديدة</h2>
        <CustomClearIcon
          sx={{}}
          onClick={() => {
            setCreating(false);
            setTitle("");
            setContent("");
            setEditing(false);
          }}
        />
        <div>
          <input
            type="text"
            name="title"
            className="form-input mb-30"
            placeholder="العنوان"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <textarea
            rows="10"
            name="content"
            className="form-input"
            placeholder="النص"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />

          {title && content && (
            <button className="button green" onClick={handleSaveNotes}>
              حفظ
              <BookmarkAddIcon style={{ marginRight: "10px" }} />
            </button>
          )}
        </div>
      </div>
    );
  };

  const getPreview = () => {
    if (notes.length === 0) return <Message title="لا يوجد ملاحضة" />;
    if (!selectedNode) return <Message title="الرجاء اختيار ملاحضة" />;
    const note = notes.find((note) => note.id === selectedNode);
    const handleEditNotes = () => {
      setTitle(note.title);
      setContent(note.content);
      setEditing(true);
    };

    return (
      <div
        data-aos="fade-left"
        // data-aos-duration="2000"
        data-aos-anchor-placement="center-bottom"
      >
        <div className="note-operations">
          <a href="#" onClick={handleEditNotes}>
            <i className="fa fa-pencil-alt" />
          </a>
          <a href="#" onClick={removeNote}>
            <i className="fa fa-trash" />
          </a>
        </div>
        <div className="experimental-note">
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <div className="notes-section">
        <ul className="notes-list">
          {notes.map((note) => (
            <li
              key={note.id}
              className={`note-item ${note.id === selectedNode && "active"}`}
              onClick={() => {
                setCreating(false);
                setEditing(false);
                setSelectedNode(note.id);
              }}
            >
              {note.title}
            </li>
          ))}
        </ul>
        <button className="add-btn" onClick={() => setCreating(true)}>
          +
        </button>
      </div>
      <Preview showAddSuccessfully={showAddSuccessfully}>
        {(creating || editing) && getAddNote()}
        {!creating && getPreview()}
      </Preview>
    </div>
  );
}

export default App;
