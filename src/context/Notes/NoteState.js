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


    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNotes);
  };

  //editnote
  const editNote = async (id, title, description, tag) => {
    // api call

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1MTQ0MGVhNTY5YWU2OWIwMjZlZDJiIn0sImlhdCI6MTY0OTQ5NTA4Mn0.omKxWNMkC2S_kmzFZGV1tKNtiwzLQqy1pgP9N2KKLxs",
      },
      body: JSON.stringify({title, description , tag}), // body data type must match "Content-Type" header
    });
    const json =  await response.json();
    console.log(json)

    //wwe are making copy of notes so that we can directly udate in front-end we can't update state direcly from here
    let newNotes = JSON.parse(JSON.stringify(notes))
    //logic to add in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
      
    
    }
    setnotes(newNotes)
  };
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote , getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );  
};

export default NoteState;
