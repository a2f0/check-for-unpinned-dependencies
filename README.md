# check-for-unpinned-dependencies

Checks the `dependencies` and `devDependencies` of `package.json` and `package-lock.json` for dependencies with unpinned versions, and returns a non-zero exit status of any are identified.

Note: dependencies with the [git URLs](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#git-urls-as-dependencies) are not checked.

## Usage

```sh
npm i a2f0/check-for-unpinned-dependencies --save-dev
npx check-for-unpinned-dependencies
```
