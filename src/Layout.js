import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import NoteList from "./NoteList";
import { v4 as uuidv4 } from "uuid";
import { currentDate } from "./utils";
import Login from "./Login";


const localStorageKey = "lotion-v1";


function Layout() {
  const navigate = useNavigate();
  const mainContainerRef = useRef(null);
  const [collapse, setCollapse] = useState(false);
  const [notes, setNotes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentNote, setCurrentNote] = useState(-1);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const height = mainContainerRef.current.offsetHeight;
    mainContainerRef.current.style.maxHeight = `${height}px`;
    const existing = localStorage.getItem(localStorageKey);
    if (existing) {
      try {
        setNotes(JSON.parse(existing));
      } catch {
        setNotes([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (currentNote < 0) {
      return;
    }
    if (!editMode) {
      navigate(`/notes/${currentNote + 1}`);
      return;
    }
    navigate(`/notes/${currentNote + 1}/edit`);
  }, [notes]);


  useEffect(()=> {
    async function getNotes() {
    if (profile){
      const promise = await fetch(`https://z5ursllpspinz6kt72kk3rgqba0payxg.lambda-url.ca-central-1.on.aws/?email=${profile.email}`
      );
      if (promise.status === 200){
        const data = await promise.json();
        setNotes(data);}
    }
  }
  getNotes();
}, [profile]);
  // const saveNote = async (note, index) => {
  //   if (!profile) {
  //     console.error("User not logged in");
  //     return;
  //   }
  //   const email = profile.email;
  //   note.body = note.body.replaceAll("<p><br></p>", "");
  //   setNotes([
  //     ...notes.slice(0, index),
  //     { ...note },
  //     ...notes.slice(index + 1),
  //   ]);
  //   setCurrentNote(index);
  //   setEditMode(false);

  //   const data = {
  //     email: email,
  //     access_token: profile?.access_token,
  //     note: {
  //       noteId: note.id,
  //       title: note.title,
  //       content: note.body,
  //       timestamp: note.when,
  //     },
  //   };

  const saveNote = async (note, index) => {
    console.log("clicked")
    console.log(note)
    
    note.body = note.body.replaceAll("<p><br></p>", "");
    setNotes([
      ...notes.slice(0, index),
      { ...note },
      ...notes.slice(index + 1),
    ]);
    setCurrentNote(index);
    const res = await fetch(
      "https://j3lb5b6xtclchnye36lzanpxfq0tvfsn.lambda-url.ca-central-1.on.aws/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...note, email: profile.email}),
      }
    );
    setEditMode(false);
  
};


  const deleteNote = async (index) => {
    try {
      const response = await fetch(`https://lwvym45icqngn3vjpjmvtmotyy0ahvkp.lambda-url.ca-central-1.on.aws/?email=${profile.email}&id=${index}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    setNotes([...notes.slice(0, index), ...notes.slice(index + 1)]);
    setCurrentNote(0);
    setEditMode(false);
  };

  const addNote = () => {
    setNotes([
      {
        id: uuidv4(),
        title: "Untitled",
        body: "",
        when: currentDate(),
      },
      ...notes,
    ]);
    setEditMode(true);
    setCurrentNote(0);
  };

  return (
    <div id="container">
      <header>
        <aside>
          <button id="menu-button" onClick={() => setCollapse(!collapse)}>
            &#9776;
          </button>
        </aside>
        <div id="app-header">
          <h1>
            <Link to="/notes">Lotion</Link>
          </h1>
          <h6 id="app-moto">Like Notion, but worse.</h6>
        </div>
        <Login profile={profile} setProfile={setProfile} />
        <aside>&nbsp;</aside>
      </header>
      <div id="main-container" ref={mainContainerRef}>
        <aside id="sidebar" className={collapse ? "hidden" : null}>
          <header>
            <div id="notes-list-heading">
              <h2>Notes</h2>
              <button id="new-note-button" onClick={addNote}>
                +
              </button>
            </div>
          </header>
          <div id="notes-holder">
            <NoteList notes={notes} />
          </div>
        </aside>
        <div id="write-box">
          <Outlet context={[notes, saveNote, deleteNote]} />
        </div>
      </div>
    </div>
  );
}

export default Layout;