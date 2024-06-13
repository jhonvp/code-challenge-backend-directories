module.exports = function createDirectory(directoryService, path) {
  directoryService.create(path);
  console.log(`CREATE ${path}`);
};
