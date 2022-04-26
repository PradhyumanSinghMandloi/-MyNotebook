import React , {useState, useContext} from "react";
import noteContext from "../context/Notes/noteContext"


const AddNote = () => {


     const [note , setNote]  = useState({title : "" , description : "" , tag: ""})
    const context = useContext(noteContext);
    const { addNote} =context;

    
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description , note.tag);
        setNote({title : "" , description : "" , tag: ""})
    }
    const onchange = (e)=> {

        setNote({...note , [e.target.name] : e.target.value})
    }


  return (
    <div>
      <div className="container my-3">
        <h2>Add a Note </h2>
        <form>
          <div className="mb-3 my-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              aria-describedby="emailHelp"
              onChange={onchange}
              minLength={5} required
            />
 
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label" onChange={onchange}>
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              onChange={onchange}
              minLength={5} required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="tag" className="form-label" onChange={onchange}>
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onchange}
              minLength={5} required
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleClick}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
