"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnpinnedDependencies = void 0;
const fs_1 = require("fs");
function getUnpinnedDependencies(file) {
    let dependencies;
    let devDependencies;
    let json = JSON.parse((0, fs_1.readFileSync)(file, "utf8"));
    if (file === 'package.json') {
        dependencies = json.dependencies;
        devDependencies = json.devDependencies;
    }
    else if (file === 'package-lock.json') {
        dependencies = json.packages[""].dependencies;
        devDependencies = json.packages[""].devDependencies;
    }
    else {
        throw (Error(`${file} is not compatible with check-for-unpinned-dependencies`));
    }
    let allDependencies = {
        ...dependencies,
        ...devDependencies,
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
exports.getUnpinnedDependencies = getUnpinnedDependencies;
