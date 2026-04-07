const fs = require('node:fs');
const path = require('node:path');

const rootDir = process.cwd();
const docsDir = path.join(rootDir, 'docs');
const browserDir = path.join(docsDir, 'browser');

if (!fs.existsSync(browserDir)) {
  console.error('Build output not found: docs/browser');
  process.exit(1);
}

const rmIfExists = (targetPath) => {
  if (fs.existsSync(targetPath)) {
    fs.rmSync(targetPath, { recursive: true, force: true });
  }
};

const copyDirectory = (sourceDir, targetDir) => {
  fs.mkdirSync(targetDir, { recursive: true });

  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
};

for (const entry of fs.readdirSync(docsDir, { withFileTypes: true })) {
  if (entry.name === 'browser') {
    continue;
  }

  rmIfExists(path.join(docsDir, entry.name));
}

copyDirectory(browserDir, docsDir);

const indexPath = path.join(docsDir, 'index.html');
const notFoundPath = path.join(docsDir, '404.html');
if (fs.existsSync(indexPath)) {
  fs.copyFileSync(indexPath, notFoundPath);
}

const noJekyllPath = path.join(docsDir, '.nojekyll');
fs.writeFileSync(noJekyllPath, '');

console.log('GitHub Pages output prepared in docs/.');
