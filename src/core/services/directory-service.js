class DirectoryService {
  constructor(directoryRepository) {
    this.directoryRepository = directoryRepository;
  }

  create(path) {
    this.directoryRepository.create(path);
  }

  move(source, destination) {
    this.directoryRepository.move(source, destination);
  }

  delete(path) {
    return this.directoryRepository.delete(path);
  }

  list() {
    return this.directoryRepository.list();
  }
}

module.exports = DirectoryService;
