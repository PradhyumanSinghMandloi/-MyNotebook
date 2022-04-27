import noteContext from "../context/Notes/noteContext";
import React, { useContext, useEffect, useRef ,useState } from "react";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { Button } from 'react-bootstrap';
import Modal  from 'react-bootstrap/Modal'
import { useHistory } from 'react-router-dom'


const Notes = (props) => {

  const [show, setShow] = useState(false);
  let history = useHistory();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true); 


  const context = useContext(noteContext);
  const { notes, getNotes ,editNote } = context;

  useEffect(() => {
    //if their is  saved token in localStorage
    if(localStorage.getItem("token"))
    {
    getNotes(); 
    }
    else{
    history.push("/login");}
    // eslint-disable-next-line
  }, [])

 //const ref = useRef(null)
const ref2 = useRef(null)
const refClose = useRef(null)


const updateNote  = (currentNote) => {
    
    ref2.current.click();
    setNote({id : currentNote._id ,etitle : currentNote.title , edescription : currentNote.description , etag : currentNote.tag})
    
  };

  const [note , setNote]  = useState({ id : "" ,etitle : "" , edescription : "" , etag: ""})
  const onchange = (e)=> {

    setNote({...note , [e.target.name] : e.target.value})

}


const handleClick = (e)=>{
 
  editNote(note.id , note.etitle, note.edescription , note.etag)
  refClose.current.click();
  e.preventDefault(); 
  props.showAlert("Note Updated" , "success")
}
 
  return (
    <>
      <AddNote showAlert ={props.showAlert}/>
 
      <div className="d-none">
      <Button   ref={ref2} variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>
      </div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit  Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>


        <form>
          <div className="mb-3 my-3">
            <label htmlFor="etitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="etitle"
              name="etitle"
              value={note.etitle}
              aria-describedby="emailHelp"
              onChange={onchange}
            />
 
          </div>
          <div className="mb-3">
            <label htmlFor="edescription" className="form-label" onChange={onchange}>
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="edescription"
              name="edescription"
              value={note.edescription}
              minLength={5} required
              onChange={onchange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="etag" className="form-label" onChange={onchange}>
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="etag"
              name="etag"
              value={note.etag}
              onChange={onchange}
              minLength={5} required
            />
          </div>
         
        </form>


        </Modal.Body>
        <Modal.Footer>
          <Button ref={refClose} variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button  variant="primary" onClick={handleClick}>
            Update Note
          </Button>
        </Modal.Footer>
      </Modal>     
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2">
        {notes.length===0 && 'You have no notes in you book'}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem showAlert ={props.showAlert} key={note._id}  note={note} updateNote={updateNote} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
