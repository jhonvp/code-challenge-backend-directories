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

test("Directory move", () => {
  const root = new Directory("");
  root.create("grains/squash");
  root.create("vegetables");
  const initialOutput = normalizeOutput(root.list());
  expect(initialOutput).toContain(
    normalizeOutput("grains\n  squash\n vegetables\n")
  );
  expect(initialOutput).toContain(normalizeOutput(""));
  root.move("grains/squash", "vegetables");
  const moveOutput = normalizeOutput(root.list());
  expect(moveOutput).toContain(
    normalizeOutput("grains\n  vegetables\n squash\n ")
  );
});

test("Directory move to non-existing destination", () => {
  const root = new Directory("");
  root.create("grains/squash");
  const result = root.move("grains/squash", "non_existing/example");
  expect(result).toBe(
    "Error: Cannot move grains/squash to non_existing/example - destination does not exist"
  );
  expect(
    root.subdirectories.get("grains").subdirectories.get("squash")
  ).toBeDefined();
});

test("Directory move non-existing source", () => {
  const root = new Directory("");
  root.create("vegetables");
  const result = root.move("non_existing", "vegetables");
  expect(result).toBe(
    "Error: Cannot move non_existing - source does not exist"
  );
  expect(root.subdirectories.get("vegetables")).toBeDefined();
});

test("Directory deletion", () => {
  const root = new Directory("");
  root.create("fruits/apples");
  root.delete("fruits/apples");
  expect(
    root.subdirectories.get("fruits").subdirectories.get("apples")
  ).toBeUndefined();
});

test("List directories", () => {
  const root = new Directory("");
  root.create("fruits/apples/fuji");
  root.create("grains");
  const output = normalizeOutput(root.list());
  expect(output).toContain(normalizeOutput("fruits\n  apples\n    fuji\n"));
  expect(output).toContain(normalizeOutput("grains\n"));
});
