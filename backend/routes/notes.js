const express = require("express");
var fetchuser = require(`../middleware/fetchuser`);
const Notes = require(`../models/Notes`);
const { body, validationResult } = require(`express-validator`);

const router = express.Router();

//ROUTE -1 -: "/api/auth/fetchallnotes"
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
        console.log(req.user);
        const notes = await Notes.find({ user: req.user.id });

        res.json(notes);

  } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server  error occured");
          
  }
});

//ROUTE -2 -: "/api/auth/addnote  -: to add note"
router.post(
  "/addnote",
  fetchuser,
  [
    body(`title`, `Enter a valid name`).isLength({ min: 3 }),
    body(`description`, `Description  must be atleast 5 characters`).isLength({
      min: 5,
    }),
  ],
  async (req, res) => {

   try {
          // fetchnig value from  req body
        const {title , description , tag, date } = req.body;
        //if there are errors , return errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
    
        //saving notes
        const saveNote = await note.save()

        res.json(saveNote);
      }catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server  error occured");
   }
           
   } 
);



//ROUTE -3 -: "/api/notes/updatenote/:id  -: to add note"
router.put(
  "/updatenote/:id",
  fetchuser,
  async (req, res) => {

     const{title , description , tag}  = req.body;

     //create a newnote object
     const newNote ={};
     if(title){ newNote.title = title};
     if(description){ newNote.description = description};
     if(tag){ newNote.tag = tag};


     //Find the note to be updated 
     let  note = await  Notes.findById(req.params.id);
     if(!note){res.status(404).send("Note Found")}

     if(note.user.toString() !==req.user.id){
       return res.status(401).send("Not allowed");
     }

     note = await Notes.findByIdAndUpdate(req.params.id , {$set : newNote} , {new : true})
     res.json({note});

  });

module.exports = router;
