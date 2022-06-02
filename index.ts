#!/usr/bin/env npx ts-node
import { readFileSync } from 'fs';
console.info('Checking for pinned dependencies.');

let packageJson = JSON.parse(readFileSync("package.json", "utf8"));
let dependencies: {[key: string]: string} = packageJson.dependencies;
let devDependencies: {[key: string]: string} = packageJson.devDependencies;

let allDependencies: {[key: string]: string} = {
  ...dependencies,
  ...devDependencies,
}

let unpinnedVersions: {[key: string]: string} = {}
// Semantic versions
// https://docs.npmjs.com/about-semantic-versioning
// Note: everything after nn.nn.nn is permitted to allow alpha / beta versions.
const acceptableVersions = new RegExp('^[0-9]+\\.[0-9]+\\.[0-9]+*');

for (const entry of Object.entries(allDependencies)) {
  const dependency: string = entry[0];
  const version: string = entry[1];
  const isValid = acceptableVersions.test(version);
  if (isValid === false) {
    unpinnedVersions[dependency] = version;
  }
}

const unpinnedSize = Object.keys(unpinnedVersions).length;
if (unpinnedSize > 0) {
  console.info(`Found ${unpinnedSize} unpinned versions: `);
  console.info(unpinnedVersions)
  process.exit(1);
}
console.info('No unpinned dependencies found.')
