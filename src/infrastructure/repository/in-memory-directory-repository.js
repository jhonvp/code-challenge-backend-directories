const DirectoryRepository = require("../../core/ports/output/directory-repository");
const Directory = require("../../core/models/directory");

class InMemoryDirectoryRepository extends DirectoryRepository {
  constructor() {
    super();
    this.root = new Directory("");
  }

  create(path) {
    this.root.create(path);
  }

  move(source, destination) {
    this.root.move(source, destination);
  }

  delete(path) {
    return this.root.delete(path);
  }

  list() {
    return this.root.list();
  }
}

module.exports = InMemoryDirectoryRepository;
