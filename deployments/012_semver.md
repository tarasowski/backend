# How to use Semantic Versioning

[Source](https://docs.npmjs.com/getting-started/semantic-versioning)

* It's important to use versioning because we want to communicate the changes in the release. 

* We need to do that because sometimes changes will break the code that depends on this package.

## Usage of Semver as Publisher

* When a project will be shared with other it starts with `1.0.0`. Many people don't following the rules, they just start with `0.X.X` but what it means to start with zero, it means your package is not stable at the initial release.
    + If you want to make a change that doesn't break anything it's just a minor bugfix, then you add what it's called a patch release and do that just by increment the last number `1.0.1`
    + If you add a new feature like a function to the API, which does not break anything is just adds functionality, than that's a minor release `1.1.0`, you increment the middle number.
    + And finally if you make changes that is going to break things e.g. your API is not backwards compatible,then you have a new major release `2.0.0`

## Use of Semver as User

* You need specify which kind of updates you want to accept. You need to specify the version number you want accept. 
    + You can say I want only accept patch updates. You need to specify it in your package.json as `1.0.x or ~1.0.4`. Having an `x` in place of the patch number or having a tilde in place
    + If you want to download new features but not anything that is not backwards compatible `1.x or ^1.0.4`

**Note:** `npm version patch` command does increment the version number, that is just a patch of our version number. If you release a new feature you can use `npm version minor` command to increment the number. If you do changes that are not backwards compatible you use `npm version major` command. If you want to specify which version you want to accept you can use `npm install packageName@1.x`it will install only the versions that are backwards compatible.

![Example](https://docs.npmjs.com/images/semvertable.png)

If you were starting with a package 1.0.4, this is how you would specify the ranges:

* Patch releases: 1.0 or 1.0.x or ~1.0.4
* Minor releases: 1 or 1.x or ^1.0.4
* Major releases: * or x