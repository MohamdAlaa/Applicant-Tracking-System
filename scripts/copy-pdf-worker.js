import { copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const source = join(rootDir, 'node_modules', 'pdfjs-dist', 'build', 'pdf.worker.min.mjs');
const dest = join(rootDir, 'public', 'pdf.worker.min.mjs');

try {
  copyFileSync(source, dest);
  console.log('✓ Copied pdf.worker.min.mjs to public folder');
} catch (error) {
  console.error('✗ Failed to copy pdf.worker.min.mjs:', error.message);
  process.exit(1);
}

