import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesintial = []

  const [notes, setnotes] = useState(notesintial);
 
 //get all notes
 const getNotes = async () => {

  //api call
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1MTQ0MGVhNTY5YWU2OWIwMjZlZDJiIn0sImlhdCI6MTY0OTQ5NTA4Mn0.omKxWNMkC2S_kmzFZGV1tKNtiwzLQqy1pgP9N2KKLxs",
    },
    });
    const json = await response.json()
    console.log(json)
    setnotes(json)
 
};
 
 
  //add a note
  const addNote = async (title, description, tag) => {

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1MTQ0MGVhNTY5YWU2OWIwMjZlZDJiIn0sImlhdCI6MTY0OTQ5NTA4Mn0.omKxWNMkC2S_kmzFZGV1tKNtiwzLQqy1pgP9N2KKLxs",
      },
      body: JSON.stringify({title , description, tag}), // body data type must match "Content-Type" header
    });

    const json = await response.json();
    console.log(json)
    
    console.log("adding a new note");
    //api call
    // const note = {
    //   _id: "6253cc36f220f67c0567194c",
    //   user: "6251440ea569ae69b026ed2b",
    //   title: title,
    //   description: description,
    //   tag: tag,
    //   date: "2022-04-11T06:35:34.292Z",
    //   __v: 0,
    // };
    setnotes(notes.concat(json));

  };
  //delete node
  const deleteNote = async  (id) => {
    //api call 
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1MTQ0MGVhNTY5YWU2OWIwMjZlZDJiIn0sImlhdCI6MTY0OTQ5NTA4Mn0.omKxWNMkC2S_kmzFZGV1tKNtiwzLQqy1pgP9N2KKLxs",
      }, 
    });
    const json = response.json();
    console.log(json);

    console.log("deleting node with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNotes);
  };

  //editnote
  const editNote = async (id, title, description, tag) => {
    // api call

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1MTQ0MGVhNTY5YWU2OWIwMjZlZDJiIn0sImlhdCI6MTY0OTQ5NTA4Mn0.omKxWNMkC2S_kmzFZGV1tKNtiwzLQqy1pgP9N2KKLxs",
      },
      body: JSON.stringify({title, description , tag}), // body data type must match "Content-Type" header
    });
    const json =  response.json();
    console.log(json)

    //logic to add in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote , getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
