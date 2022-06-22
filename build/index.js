#!/usr/bin/env -S npx ts-node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("./lib");
console.info('Checking for pinned dependencies.');
const packageJsonUnpinned = (0, lib_1.getUnpinnedDependencies)('package.json');
const packageLockJsonUnpinned = (0, lib_1.getUnpinnedDependencies)('package-lock.json');
const allUnpinned = {
    ...packageJsonUnpinned,
    ...packageLockJsonUnpinned
};
const unpinnedSize = Object.keys(allUnpinned).length;
if (unpinnedSize > 0) {
    const packageJsonUnpinnedSize = Object.keys(packageJsonUnpinned).length;
    if (packageJsonUnpinnedSize > 0) {
        console.info(`Found ${unpinnedSize} unpinned versions in package.json:`);
        console.info(packageJsonUnpinned);
    }
    const packageLockJsonUnpinnedSize = Object.keys(packageLockJsonUnpinned).length;
    if (packageLockJsonUnpinnedSize > 0) {
        console.info(`Found ${unpinnedSize} unpinned versions in package-lock.json:`);
        console.info(packageLockJsonUnpinned);
    }
    process.exit(1);
}
console.info('No unpinned dependencies found.');
