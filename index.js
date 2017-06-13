const command = require('yargs').command;

const notesHandler = require('./notesHandler');

// Init command line argument policy
const args =
  command('add', 'Add a new note', {
    title: { describe: 'Title of note', demand: true, alias: 't' },
    content: { describe: 'Content of note', demand: true, alias: 'c' }
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title: { describe: 'Title of note', demand: true, alias: 't' }
  })
  .command('remove', 'Remove a note', {
    title: { describe: 'Title of note', demand: true, alias: 't' }
  })
  .help()
  .argv;

const firstArgument = args._[0];

const commands = {
  'add': notesHandler.add,
  'list': notesHandler.list,
  'read': notesHandler.read,
  'remove': notesHandler.remove,
};

if (commands[firstArgument]) {
  commands[firstArgument](args);
} else {
  notesHandler.display_error('Command not recognized.');  
}
