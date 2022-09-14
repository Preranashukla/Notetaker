
const router = require('express').Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require('path');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../util/helper');

//// GET Route for retrieving notes
router.get("/", (req, res) => {

    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// GET Route for a specific note
router.get('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.id === noteId);
        return result.length > 0
          ? res.json(result)
          : res.json('No note with that ID');
      });
  });


// DELETE Route for a specific note
router.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all notes
        const result = json.filter((note) => note.id !== noteId);
  
        // Save that array to the filesystem
        writeToFile('./db/db.json', result);
  
        
        res.json(`Note ${noteId} has been deleted 🗑️`);
      });
  });

  
 
router.post("/", (req,res) => {
    console.log(req.body);

    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(newNote);
    } else {
      res.error('Error in adding note');
    }
  });

    


module.exports = router;