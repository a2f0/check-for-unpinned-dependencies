#!/usr/bin/env -S npx ts-node
import { readFileSync } from 'fs';
console.info('Checking for pinned dependencies.');

let packageJson = JSON.parse(readFileSync("package.json", "utf8"));
let dependencies: {[key: string]: string} = packageJson.dependencies;
let devDependencies: {[key: string]: string} = packageJson.devDependencies;

let packageLockJson = JSON.parse(readFileSync("package-lock.json", "utf8"));
let packageLockDependencies: {[key: string]: string} = packageLockJson.packages[""].dependencies;
let packageLockDevDependencies: {[key: string]: string} = packageLockJson.packages[""].devDependencies;

function getUnpinnedDependencies(deps: {[key: string]: string} , devDeps: {[key: string]: string}) {
  let allDependencies: {[key: string]: string} = {
    ...deps,
    ...devDeps,
  }
  let unpinnedVersions: {[key: string]: string} = {}
  // Semantic versions
  // https://docs.npmjs.com/about-semantic-versioning
  // Note: everything after nn.nn.nn is permitted to allow alpha / beta versions.
  const acceptableVersions = new RegExp('^[0-9]+\\.[0-9]+\\.[0-9]+');

  for (const entry of Object.entries(allDependencies)) {
    const dependency: string = entry[0];
    const version: string = entry[1];
    const isValid = acceptableVersions.test(version);
    if (isValid === false && !version.startsWith('git')) {
      unpinnedVersions[dependency] = version;
    }
  }
  return unpinnedVersions;
}

const packageJsonUnpinned = getUnpinnedDependencies(dependencies, devDependencies)
const packageLockJsonUnpinned = getUnpinnedDependencies(packageLockDependencies, packageLockDevDependencies)

const allUnpinned: {[key: string]: string} = {
  ...packageJsonUnpinned,
  ...packageLockJsonUnpinned 
}

const unpinnedSize = Object.keys(allUnpinned).length;
if (unpinnedSize > 0) {
  
  const packageJsonUnpinnedSize = Object.keys(packageJsonUnpinned).length 
  if(packageJsonUnpinnedSize > 0) {
    console.info(`Found ${unpinnedSize} unpinned versions in package.json:`);
    console.info(packageJsonUnpinned)
  }
   
  const packageLockJsonUnpinnedSize = Object.keys(packageLockJsonUnpinned).length 
  if(packageLockJsonUnpinnedSize > 0) {
    console.info(`Found ${unpinnedSize} unpinned versions in package-lock.json:`);
    console.info(packageLockJsonUnpinned)
  }  
  process.exit(1);
}

console.info('No unpinned dependencies found.')
