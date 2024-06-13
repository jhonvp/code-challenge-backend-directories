module.exports = function moveDirectory(directoryService, source, destination) {
  directoryService.move(source, destination);
  console.log(`MOVE ${source} ${destination}`);
};
