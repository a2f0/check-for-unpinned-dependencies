#!/usr/bin/env npx ts-node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
console.info('Checking for pinned dependencies.');
let packageJson = JSON.parse((0, fs_1.readFileSync)("package.json", "utf8"));
let dependencies = packageJson.dependencies;
let devDependencies = packageJson.devDependencies;
let allDependencies = {
    ...dependencies,
    ...devDependencies,
};
let unpinnedVersions = {};
// Semantic versions
// https://docs.npmjs.com/about-semantic-versioning
// Note: everything after nn.nn.nn is permitted to allow alpha / beta versions.
const acceptableVersions = new RegExp('^[0-9]+\\.[0-9]+\\.[0-9]+*');
for (const entry of Object.entries(allDependencies)) {
    const dependency = entry[0];
    const version = entry[1];
    const isValid = acceptableVersions.test(version);
    if (isValid === false) {
        unpinnedVersions[dependency] = version;
    }
}
const unpinnedSize = Object.keys(unpinnedVersions).length;
if (unpinnedSize > 0) {
    console.info(`Found ${unpinnedSize} unpinned versions: `);
    console.info(unpinnedVersions);
    process.exit(1);
}
console.info('No unpinned dependencies found.');
