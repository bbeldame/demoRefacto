const config = require('./config.json');
const fs = require('fs');

const display_error = (message) => {
  console.error(message);
  process.exit();
};

const display_note = ({title, content}) => {
  console.log(
`
  > Title: ${title}
  > Content: ${content}
`);
}

/**
 * Add a new note to the file
 * args.c is the content
 * args.t is the title
 * @param {object} args
 */
exports.add = (args) => {
  let data;
  const newNote = {
    title: args.t,
    content: args.c,
  };

  try {
    data = JSON.parse(fs.readFileSync(config.filePath));
  } catch (err) {
    data = [];
  }

  if (data.find(note => note.title === newNote.title)) {
    display_error('A note with this title already exists');
  } else {
    data.push(newNote);
    try {
      fs.writeFileSync(config.filePath, JSON.stringify(data));
    } catch (err) {
      display_error(`An error occured while writing in ${config.filePath} : ${err}`);
    }
    console.log('Note created.');
    display_note(newNote);
  }
}

/**
 * Read a note in the file
 * args.t is the title
 * @param {object} args
 */
exports.read = (args) => {
  let data;

  try {
    data = JSON.parse(fs.readFileSync(config.filePath));
  } catch (err) {
    display_error(`An error occured while fetching ${config.filePath} : ${err}`);
  }

  if (data.length === 0) {
    display_error('There are no notes');
  } else {
    const note = data.find(noteFound => noteFound.title === args.t);
    if (typeof note === 'undefined') {
      display_error('Note not found');
    } else {
      console.log('Note found');
      display_note(note);
    }
  }
}

/**
 * List all notes in the file
 */
exports.list = () => {
  let data;

  try {
    data = JSON.parse(fs.readFileSync(config.filePath));
  } catch (err) {
    display_error(`An error occured while fetching ${config.filePath} : ${err}`);
  }

  if (data.length === 0) {
    display_error('There are no notes');
  } else {
    data.map((note, index) => {
      console.log(`Note no.${index}`);
      display_note(note)
    });
  }
}

/**
 * Remove a note from the file
 * args.t is the title
 * @param {object} args
 */
exports.remove = (args) => {
  let data;

  try {
    data = JSON.parse(fs.readFileSync(config.filePath));
  } catch (err) {
    display_error(`An error occured while fetching ${config.filePath} : ${err}`);
  }

  if (data.length === 0) {
    display_error('There are no notes');
  } else {
    const note = data.find(noteFound => noteFound.title === args.t);
    if (typeof note === 'undefined') {
      display_error('Note not found');
    } else {
      const filteredNotes = data.filter(n => n.title !== args.t);
        try {
          fs.writeFileSync('data.json', JSON.stringify(filteredNotes));
        } catch (err) {
          display_error(`An error occured while removing a note : ${err}`);
        }
      console.log('Note was removed');
    }
  }
}

exports.display_error = display_error;
