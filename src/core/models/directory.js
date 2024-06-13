class Directory {
  constructor(name) {
    this.name = name;
    this.subdirectories = new Map();
  }

  create(path) {
    const parts = path.split("/");
    let current = this;
    for (const part of parts) {
      if (!current.subdirectories.has(part)) {
        current.subdirectories.set(part, new Directory(part));
      }
      current = current.subdirectories.get(part);
    }
  }

  move(source, destination) {
    throw new Error("To be implemented");
  }

  delete(path) {
    throw new Error("To be implemented");
  }

  list(indent = 0) {
    const spaces = " ".repeat(indent * 2);
    let result = `${spaces}${this.name}\n`;
    for (const [name, subDir] of this.subdirectories) {
      result += subDir.list(indent + 1);
    }
    return result;
  }
}

module.exports = Directory;
