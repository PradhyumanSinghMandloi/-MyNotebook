import React , {useState, useContext} from "react";
import noteContext from "../context/Notes/noteContext"


const AddNote = () => {


     const [note , setNote]  = useState({title : "" , description : "" , tag: "default"})
    const context = useContext(noteContext);
    const { addNote} =context;

    
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description , note.tag);
         
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
              aria-describedby="emailHelp"
              onChange={onchange}
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
              onChange={onchange}
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
              onChange={onchange}
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