import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourceRoots = ["app", "components", "data", "lib"];
const extensions = new Set([".js", ".jsx", ".mjs"]);
const violations = [];

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

for (const sourceRoot of sourceRoots) {
  const directory = path.join(root, sourceRoot);
  if (!fs.existsSync(directory)) continue;

  for (const file of walk(directory).filter((candidate) => extensions.has(path.extname(candidate)))) {
    const relativePath = path.relative(root, file).replaceAll("\\", "/");
    const source = fs.readFileSync(file, "utf8");

    if ((relativePath.startsWith("lib/") || relativePath.startsWith("data/")) && /from ["']@\/(components|app)\//.test(source)) {
      violations.push(`${relativePath}: data and library modules cannot import UI layers`);
    }

    if (relativePath.startsWith("components/") && /from ["']@\/app\//.test(source)) {
      violations.push(`${relativePath}: components cannot import route modules`);
    }
  }
}

if (violations.length > 0) {
  console.error(violations.join("\n"));
  process.exit(1);
}

console.log("Architecture contracts passed.");
