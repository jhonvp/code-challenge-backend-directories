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
    const [srcParent, srcName] = this._getParentAndName(source);
    const [destParent] = this._getParentAndName(destination);

    if (!srcParent || !srcParent.subdirectories.has(srcName)) {
      return `Error: Cannot move ${source} - source does not exist`;
    }
    if (!destParent) {
      return `Error: Cannot move ${source} to ${destination} - destination does not exist`;
    }

    const dirToMove = srcParent.subdirectories.get(srcName);
    srcParent.subdirectories.delete(srcName);
    destParent.subdirectories.set(srcName, dirToMove);
  }

  delete(path) {
    const [parent, name] = this._getParentAndName(path);
    if (parent && parent.subdirectories.has(name)) {
      parent.subdirectories.delete(name);
    } else {
      return `Cannot delete ${path} - ${path
        .split("/")
        .slice(0, -1)
        .join("/")} does not exist`;
    }
  }

  list(indent = 0) {
    const spaces = " ".repeat(indent * 2);
    let result = `${spaces}${this.name}\n`;
    for (const [name, subDir] of this.subdirectories) {
      result += subDir.list(indent + 1);
    }
    return result;
  }
  _getParentAndName(path) {
    const parts = path.split("/");
    const name = parts.pop();
    let parent = this;
    for (const part of parts) {
      if (!parent.subdirectories.has(part)) {
        return [null, null];
      }
      parent = parent.subdirectories.get(part);
    }
    return [parent, name];
  }
}

module.exports = Directory;
