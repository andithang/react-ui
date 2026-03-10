/* eslint-disable no-undef */
import { access, copyFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const outputDir = path.resolve(process.cwd(), 'storybook-static');
const noJekyllPath = path.join(outputDir, '.nojekyll');
const includeCname = process.env.STORYBOOK_INCLUDE_CNAME === '1';

await mkdir(outputDir, { recursive: true });
await writeFile(noJekyllPath, '\n', 'utf8');
console.log('Created storybook-static/.nojekyll');

if (includeCname) {
  const cnameSource = path.resolve(process.cwd(), 'CNAME');
  const cnameDestination = path.join(outputDir, 'CNAME');

  try {
    await access(cnameSource);
    await copyFile(cnameSource, cnameDestination);
    console.log('Copied CNAME into storybook-static/');
  } catch {
    console.warn('CNAME was not found at repository root; skipping copy.');
  }
}
