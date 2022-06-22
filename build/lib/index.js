"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnpinnedDependencies = void 0;
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
exports.getUnpinnedDependencies = getUnpinnedDependencies;
