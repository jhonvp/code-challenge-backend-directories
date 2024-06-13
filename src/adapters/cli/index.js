const readline = require("readline");
const InMemoryDirectoryRepository = require("../../infrastructure/repository/in-memory-directory-repository");
const DirectoryService = require("../../core/services/directory-service");
const createDirectory = require("../../core/ports/input/create-directory");
const moveDirectory = require("../../core/ports/input/move-directory");
const deleteDirectory = require("../../core/ports/input/delete-directory");
const listDirectories = require("../../core/ports/input/list-directories");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const directoryRepository = new InMemoryDirectoryRepository();
const directoryService = new DirectoryService(directoryRepository);

function processCommand(command) {
  const [action, ...args] = command.trim().split(" ");

  switch (action) {
    case "CREATE":
      createDirectory(directoryService, args[0]);
      break;
    case "MOVE":
      moveDirectory(directoryService, args[0], args[1]);
      break;
    case "DELETE":
      deleteDirectory(directoryService, args[0]);
      break;
    case "LIST":
      listDirectories(directoryService);
      break;
    default:
      console.log(`Unknown command: ${command}`);
  }
}

function getCommands() {
  rl.question("Enter a command: ", (command) => {
    if (command.trim().toUpperCase() === "EXIT") {
      rl.close();
      return;
    }
    processCommand(command);
    getCommands();
  });
}

console.log("Welcome to Backend Challenge :)");
console.log("Commands: CREATE, MOVE, DELETE, LIST");
console.log("Type EXIT to quit.");
getCommands();
