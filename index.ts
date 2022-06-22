#!/usr/bin/env -S npx ts-node
import { getUnpinnedDependencies } from './lib';

console.info('Checking for pinned dependencies.');

const packageJsonUnpinned = getUnpinnedDependencies('package.json')
const packageLockJsonUnpinned = getUnpinnedDependencies('package-lock.json')

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
