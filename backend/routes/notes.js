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

module.exports = router;
