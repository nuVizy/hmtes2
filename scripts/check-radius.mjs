import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const INCLUDE_EXT = new Set([".ts", ".tsx", ".js", ".jsx", ".css", ".html"]);
const IGNORE_DIRS = new Set(["node_modules", "dist", "build", "coverage", ".git"]);

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(entry.name)) continue;
      walk(p, out);
      continue;
    }
    const ext = path.extname(entry.name);
    if (INCLUDE_EXT.has(ext)) out.push(p);
  }
  return out;
}

function lineNumberFromIndex(text, index) {
  // 1-based line numbers
  let line = 1;
  for (let i = 0; i < index; i++) {
    if (text.charCodeAt(i) === 10) line++;
  }
  return line;
}

const files = [...walk(path.join(ROOT, "src"))];
const indexHtml = path.join(ROOT, "index.html");
if (fs.existsSync(indexHtml)) files.push(indexHtml);

const problems = [];

// Matches Tailwind rounded utilities with any number of variant prefixes (e.g. md:hover:rounded-xl).
// We then validate that the final segment is EXACTLY `rounded-none`.
const roundedToken = /([\w\-\[\]\/]+:)*rounded(?:-\[[^\]]+\]|-[^\s"'`<>]+)?/g;

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");

  // Hard rule: no rounding anywhere. CSS `border-radius` must resolve to 0.
  for (const m of content.matchAll(/\bborder-radius\s*:\s*([^;]+);/gi)) {
    const value = (m[1] ?? "").trim();
    const idx = m.index ?? 0;

    // Allow explicit zero only.
    if (!/^0(?:px|rem|%)?(?:\s*!important)?$/i.test(value)) {
      problems.push({
        file,
        line: lineNumberFromIndex(content, idx),
        token: `border-radius: ${value}`,
        message: "Disallowed CSS border-radius value (must be 0)."
      });
    }
  }

  // Hard rule: JS `borderRadius` must resolve to 0.
  for (const m of content.matchAll(/\bborderRadius\s*:\s*([^,\n}]+)/g)) {
    const value = (m[1] ?? "").trim();
    const idx = m.index ?? 0;

    // Allow explicit zero only.
    if (!/^(0|"0"|'0'|"0px"|'0px')$/.test(value)) {
      problems.push({
        file,
        line: lineNumberFromIndex(content, idx),
        token: `borderRadius: ${value}`,
        message: "Disallowed JS borderRadius value (must be 0)."
      });
    }
  }

  for (const match of content.matchAll(roundedToken)) {
    const token = match[0];
    const idx = match.index ?? 0;
    const last = token.split(":").pop() ?? token;

    // Allow only rounded-none (with any prefixes).
    if (last !== "rounded-none") {
      problems.push({
        file,
        line: lineNumberFromIndex(content, idx),
        token,
        message: "Disallowed Tailwind rounded utility (only rounded-none is allowed)."
      });
    }
  }
}

if (problems.length) {
  console.error("\n❌ Radius check failed. Found disallowed rounding utilities / non-zero radius values:\n");
  for (const p of problems) {
    const rel = path.relative(ROOT, p.file);
    console.error(`- ${rel}:${p.line}  ${p.message}\n  → ${p.token}`);
  }
  console.error("\nFix: remove all rounded-* (except rounded-none) and ensure border-radius/borderRadius resolve to 0.\n");
  process.exit(1);
}

console.log("✅ Radius check passed (no rounded-* utilities except rounded-none).");
