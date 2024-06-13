class Directory {
  constructor(name) {
    this.name = name;
    this.subdirectories = new Map();
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

  list(indent = 0) {
    throw new Error("To be implemented");
  }
}

module.exports = Directory;
