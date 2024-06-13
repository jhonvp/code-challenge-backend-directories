const Directory = require("../../../src/core/models/directory");

function normalizeOutput(output) {
  return output
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join("\n");
}

test("Directory creation", () => {
  const root = new Directory("");
  root.create("fruits/apples");
  expect(
    root.subdirectories.get("fruits").subdirectories.get("apples")
  ).toBeDefined();
});

test("List directories", () => {
  const root = new Directory("");
  root.create("fruits/apples/fuji");
  root.create("grains");
  const output = normalizeOutput(root.list());
  expect(output).toContain(normalizeOutput("fruits\n  apples\n    fuji\n"));
  expect(output).toContain(normalizeOutput("grains\n"));
});
