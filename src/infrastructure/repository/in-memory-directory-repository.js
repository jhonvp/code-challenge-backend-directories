const DirectoryRepository = require("../../core/ports/output/directory-repository");
const Directory = require("../../core/models/directory");

class InMemoryDirectoryRepository extends DirectoryRepository {
  constructor() {
    throw new Error("To be implemented");
  }

  create(path) {
    throw new Error("To be implemented");
  }

  move(source, destination) {
    throw new Error("To be implemented");
  }

  delete(path) {
    throw new Error("To be implemented");
  }

  list() {
    throw new Error("To be implemented");
  }
}

module.exports = InMemoryDirectoryRepository;
