export function getUnpinnedDependencies(deps: {[key: string]: string} , devDeps: {[key: string]: string}) {
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
