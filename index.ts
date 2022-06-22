#!/usr/bin/env -S npx ts-node
import { readFileSync } from 'fs';
import { getUnpinnedDependencies } from './lib';

console.info('Checking for pinned dependencies.');

let packageJson = JSON.parse(readFileSync("package.json", "utf8"));
let dependencies: {[key: string]: string} = packageJson.dependencies;
let devDependencies: {[key: string]: string} = packageJson.devDependencies;

let packageLockJson = JSON.parse(readFileSync("package-lock.json", "utf8"));
let packageLockDependencies: {[key: string]: string} = packageLockJson.packages[""].dependencies;
let packageLockDevDependencies: {[key: string]: string} = packageLockJson.packages[""].devDependencies;

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
