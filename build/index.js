#!/usr/bin/env -S npx ts-node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
console.info('Checking for pinned dependencies.');
let packageJson = JSON.parse((0, fs_1.readFileSync)("package.json", "utf8"));
let dependencies = packageJson.dependencies;
let devDependencies = packageJson.devDependencies;
let packageLockJson = JSON.parse((0, fs_1.readFileSync)("package-lock.json", "utf8"));
let packageLockDependencies = packageLockJson.packages[""].dependencies;
let packageLockDevDependencies = packageLockJson.packages[""].devDependencies;
function getUnpinnedDependencies(deps, devDeps) {
    let allDependencies = {
        ...deps,
        ...devDeps,
    };
    let unpinnedVersions = {};
    // Semantic versions
    // https://docs.npmjs.com/about-semantic-versioning
    // Note: everything after nn.nn.nn is permitted to allow alpha / beta versions.
    const acceptableVersions = new RegExp('^[0-9]+\\.[0-9]+\\.[0-9]+');
    for (const entry of Object.entries(allDependencies)) {
        const dependency = entry[0];
        const version = entry[1];
        const isValid = acceptableVersions.test(version);
        if (isValid === false && !version.startsWith('git')) {
            unpinnedVersions[dependency] = version;
        }
    }
    return unpinnedVersions;
}
const packageJsonUnpinned = getUnpinnedDependencies(dependencies, devDependencies);
const packageLockJsonUnpinned = getUnpinnedDependencies(packageLockDependencies, packageLockDevDependencies);
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
