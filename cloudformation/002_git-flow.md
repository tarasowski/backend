# Git Flow & Branching Strategy

[Original Source](http://nvie.com/posts/a-successful-git-branching-model/)

The model discussed here is a set of procedures that every team member has to follow in order to come to a managed software development process.


## Decentralized but centralized

The repository setup that we use and that works well with this branching model, is that with a central "truth" repo. We will refer to this `repo` as origin.

* "remote" is just some git repository not on your computer (e.g. on github).
* "origin" is the repository you cloned your repository from (e.g. the one on your github). Origin is the default name for a remote repository, but you may change that. 
* "master" is just the name of the default branch.  It's called "master" because generally it's the branch that represents production code, and that all other branches come from and generally eventually rejoin. The branch automatically created for you when you create a git repository is called “master”. [Source](https://www.quora.com/What-does-git-remote-and-origin-mean)

![origin](http://nvie.com/img/centr-decentr@2x.png)

**Note:** Each developer pulls and pushes to origin. 

## The Main Branches

The central repo holds two main branches with infinite lifetime:
* master
* develop

The `master` branch at origin should be familiar to any git user. Parallel to the `master` branch, another branch exists called `develop`

* `origin/master` to be the main branch where the source code of HEAD always reflects a production-ready state
* `origin/develop` to be the main branch where the source code of HEAD always reflects a state with the latest delivered development changes for the next release. Someone would call this the "integration branch". This is where any automatic nightly builds are built from.

* Your working tree is what is actually in the files that you are currently working on.
* HEAD (current branch or last committed state on current branch)

![Process](http://nvie.com/img/main-branches@2x.png)

**Note:** When the source code in the `develop` branch reaches a stable point and is ready to be released, all of the changes should be merged back into `master` and tagged with a release number. Therefore each time when changes are merged back into master, this is new production release by definition.

## Supporting Branches

Unlike the main branches this branches have limited life time, since they will be removed eventually.

### Feature Branch

Feature branches: are used to develop new features for the upcoming or a distant future release
    + Branch off from `develop`
    + Megre back to `develop`
    + Branch naming conventions except `master`, `develop`, `release-*`, or `hotfix-*`

**Creating a branch**
```git
$ git checkout -b myfeature develop
Switched to a new branch "myfeature
``` 

**Incorporating a finished feature on develop**
```git
$ git checkout develop
Switched to branch 'develop'
$ git merge --no-ff myfeature
Updating ea1b82a..05e9557
(Summary of changes)
$ git branch -d myfeature
Deleted branch myfeature (was 05e9557).
$ git push origin develop
``` 

**Note:** The --no-ff flag causes the merge to always create a new commit object, even if the merge could be performed with a fast-forward. Reverting a whole feature (i.e. a group of commits), is a true headache in the latter situation, whereas it is easily done if the --no-ff flag was used.

![Develop](http://nvie.com/img/merge-without-ff@2x.png)

### Release branches

* Release branch: supports preparation of a new product release 
    + My branch off from `develop`
    + Must merge back into `develop` or `master`
    + Branch naming convention `release-*`

**Note:** They key moment to branch off a new release branch from develop is when develop (almost) reflects the desired state of the new release. 

**Creating a release branch**: `release` branch is created from a `develop` branch
```git
$ git checkout -b release-1.2 develop
Switched to a new branch "release-1.2"
$ ./bump-version.sh 1.2
Files modified successfully, version bumped to 1.2.
$ git commit -a -m "Bumped version number to 1.2"
[release-1.2 74d9424] Bumped version number to 1.2
1 files changed, 1 insertions(+), 1 deletions(-)
``` 
**Note:** After creating a new branch and switching to it, we bump the version number. Here, bump-version.sh is a finctional shell script that changes some files in the working copy to reflect the new version. The release branch may be rolled out definitely. During that time bug fixes may be applied in this branch (rather than on `develop` branch). Adding large new features here is strictly prohibited.

**Finishing a release branch**
1. The release branch needs to be merged into master
2. Commit on `master` needs to be tagged for easy future reference to the historical version
3. The changes made on the `release` branch need to be merged back into `develop`, so that future releases also contain those bug fixes.

**The first two steps in Git**
```git
$ git checkout master
Switched to branch 'master'
$ git merge --no-ff release-1.2
Merge made by recursive.
(Summary of changes)
$ git tag -a 1.2
``` 
**Note:** The release is now done , and tagged for future reference.

**Meging `release` back into `develop`**
```git
$ git checkout develop
Switched to branch 'develop'
$ git merge --no-ff release-1.2
Merge made by recursive.
(Summary of changes)
``` 

**Note:** It may lead to conflicts, if so fix and commit.

**Removal of the `release` branch**
```git
$ git branch -d release-1.2
Deleted branch release-1.2 (was ff452fe).
``` 

### Hotfix Branches

* Hotfix branches: They are similar to `release` branches but unplanned. They arise from the necessity to act immediately upon an undesired state of a live production version. When a critical bug in the production version must be resolved immediately.
    + May branch off from `master`
    + May merge back into `develop` and `master`
    + Branch naming convention `hotfix-*`

**Note:** The essense is that work of team members (on the `develop` branch) can continue, while other person is preparing a quick production fix.

**Creating a `hotfix` branch**
```git
$ git checkout -b hotfix-1.2.1 master
Switched to a new branch "hotfix-1.2.1"
$ ./bump-version.sh 1.2.1
Files modified successfully, version bumped to 1.2.1.
$ git commit -a -m "Bumped version number to 1.2.1"
[hotfix-1.2.1 41e61bb] Bumped version number to 1.2.1
1 files changed, 1 insertions(+), 1 deletions(-)
``` 

**Note:** Don't forget to bump a version after branching off (It means to increment the version number to a new, unique value)

**Fix the bug and commit**
```git
$ git commit -m "Fixed severe production problem"
[hotfix-1.2.1 abbe5d6] Fixed severe production problem
5 files changed, 32 insertions(+), 17 deletions(-)
```

When finished, the bug fix needs to be merged back into `master`, but also needs to be merged back into `develop`.

**Finishing a hotfix branch**
```git
$ git checkout master
Switched to branch 'master'
$ git merge --no-ff hotfix-1.2.1
Merge made by recursive.
(Summary of changes)
$ git tag -a 1.2.1
``` 

**Include the bugfix into `develop`**
```git
$ git checkout develop
Switched to branch 'develop'
$ git merge --no-ff hotfix-1.2.1
Merge made by recursive.
(Summary of changes)
``` 

**Note:** When a release branch currently exists, the hotfix changes need to be merged into that `release` branch, instead of `develop`

**Remove the temporary branch**
```git
$ git branch -d hotfix-1.2.1
Deleted branch hotfix-1.2.1 (was abbe5d6).
``` 


![Git Flow](http://nvie.com/img/git-model@2x.png)

---
# Git Workflow Example

Every time a feature gets merged into the `develop` branch, the `develop` branch gets deployed to a staging environment. Periodically (more on that in a moment), a `release` branch gets created off of the develop branch, reviewed and merged into `master`. As soon as that happens, `master` gets deployed to the production environment.

![Workflow](https://cdn-images-1.medium.com/max/1600/1*J7M-iVWUK02MKEAXr7rzCQ.png)
