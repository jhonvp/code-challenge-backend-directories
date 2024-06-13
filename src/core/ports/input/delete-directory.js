module.exports = function deleteDirectory(directoryService, path) {
  const result = directoryService.delete(path);
  console.log(`DELETE ${path}`);
  if (result) console.log(result);
};
