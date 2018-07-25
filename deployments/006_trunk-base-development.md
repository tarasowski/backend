# Trunk-based Development Workflow

[Source](https://codeburst.io/trunk-based-development-vs-git-flow-a0212a6cae64)

* In the trunk-based development model, all developers work on a single branch with open access to it. Often it's simply the master branch. They commit code to it and run it. 

* They also can create a short-lived feature branches. Once code on their branch compiles and passes all tests, they merge it straight to `master`. 

**Note:** The only way to review the code is to do full code review. Developers that work in such style should be experienced so that you know they won't lower source code quality. 

---

# What is Trunk-Based Development?

[Source -  Paul Hammant](https://paulhammant.com/2013/04/05/what-is-trunk-based-development/)

It's a branching model for software development. Historically it has been called the "mainline"

![Trunk](https://paulhammant.com/images/what_is_trunk.jpg)

Trunk-based development is where all developers (for a particular deployable unit) commit to one shared branch under source-control. That branch is going to be colloqualily known as trunk. Also there are release branches that are made by release-engineers and only those can commit to those branches. They may cherry-pick individual commits to that branch. After the release has been superseded by another, the branch is most likely deleted. 

**Note:** Google and Facebook, today, practice Trunk-Based-Development style branching model. 

The release branch that will live for a short time before it is replaced by another release branch, takes everything from trunk when it's created. In terms of merges, only cherry-picks FROM trunk TO the release brunch are supported. For many enterprises only bug fixes will be merged. **Bugs are fixed on the trunk and merged to the release branch, and not vice versa.**

### Pull Requests

Feature/task is marshaled in a place that is not yet on the trunk/master but can be quickly. Normally, code review happens there and CI weighs in automatically with an option as to wheter the PR branch is eligable to be merged in to the trunk/master or not. If everything is right, the PR is merged back in the master/trunk and then deleted, leaving a smooth trunk/master timeline. 

**Important:** The feature/task branch that's subject of a pull request should be a one-person or one-pair branch, and very short-lived (say a day or so)

### Obligation for Developers

Developers do not break the build with any commit. This requires a lot of discipline. Rollback/revert of a commit is a strategy to prevent the damage (lost time) from that. More sophisticated companies will use pre-commit verifications. 

**Workflow:** Devs take on habit: prove the commit is good, by synchronising to the trunk's latest revisions, building from root/scratch, double-checking their functional change, then commiting.

### Continuous Integration

Continuous Integration, like Jenkins, kicks in for that commit, and runs through a build pipeline building, testing, deploying testing some more. It may detect failures, and most likely because a developer didn't prove their commit. 

### Summary

* Developers commit to a single trunk more or less exclusively
* Release engineers (or build-cop) create branches, and cherry-pick to branches more or less exclusively
* Only if a defect cannot be reproduced on trunk, is permission given to fix it on the release branch, and cherry-pick back to trunk.
* Trunk-Based Development means regular developers don’t commit to a release branch.
* Trunk-Based Development means you’re going to delete ‘old’ release branches, without merging them back to trunk.

> “Branching is not the problem, merging is the problem” by Jez Humble

---

# Trunk-Based Development at Facebook

[Source](https://paulhammant.com/2013/03/04/facebook-tbd/)

* [Video to Watch](https://www.facebook.com/Engineering/videos/10100259101684977/)

[TBD](https://paulhammant.com/images/facebook_tbd.png)
 C = Commmit  B = a Branch as it’s made  M = a merge (cherry-pick)


 Five (our numbers are contrived) red commits (!http://paulhammant.com/images/red_commit.png!) are merged to the main Tuesday release - these constitute “production hardening”. They were cherry picked, meaning other commits are left on trunk. Three Blue commits made it to the Wednesday release, via a cherry-pick merge. Similarly two Purple ones are for the Wednesday release, and one Brown one for the Friday release. Saturday and Sunday have no planned releases. Sunday, however, it all starts again as a new release branch is cut. There’s also that Monday release (the last one on the old branch), that has the fewest possible commits cherry-pick merged to it. One of those red cherry-picks also made it to the last release of the previous branch. One presumes that they can skip releases if there’s nothing to go out.

 * Things happen on Trunk and get merged to a release branch, if they get merged at all. Things can be regular enhancements, or can be defect fixes.
 * If you’re a developer and you’ve committed and pushed to the trunk, your stuff is going to go live in at maximum seven days.
 * Developers don’t break the build when they commit to trunk. If they do, they are automatically rolled back. They can fix the mess in their own time. To achieve this Facebook will have a serious Continuous Integration infrastructure.

 ### Feature Toggles

 If you are working on something and it's not ready yet, then you'll be wrapping the UI and logic in a "Feature Toggle". This is the implicit Branch by Abstraction for code that is replacing previous implementation of something, **mean you have avoided a feature branch that has a nebulous cost.**

 ---

 ### Feature Toggles 

 [Source](https://martinfowler.com/articles/feature-toggles.html)

 "Feature Toggling" is a set of patterns which can help a team to deliver new functionality to users rapidly but safely. Feature Toggles are also refered as to Feature Flags, Feature Bits, or Feature Flippers.

 Where and why to use Feature Toggles?

 Imagine you need to work on a functionality that will take couple of weeks to finish. And you want to avoid branching for this work. Instead you decide that the whole team will continue to work on the trunk/master. Therefore you can use "Feature Toggle" to prevent your work from impacting the rest of the team or destabilizing the codebase. 

**Before**
 ```js
 function reticulateSplines(){
    // current implementation lives here
  }
these examples all use JavaScript ES2015
 ```
**After**
```js
 function reticulateSplines(){
    var useNewAlgorithm = false;
    // useNewAlgorithm = true; // UNCOMMENT IF YOU ARE WORKING ON THE NEW SR ALGORITHM
  
    if( useNewAlgorithm ){
      return enhancedSplineReticulation();
    }else{
      return oldFashionedSplineReticulation();
    }
  }
  
  function oldFashionedSplineReticulation(){
    // current implementation lives here
  }
  
  function enhancedSplineReticulation(){
    // TODO: implement better SR algorithm
  }
``` 

**Note:** The pair have moved the current algorithm implementation into an `oldFashionedSplineReticulation()` function, and turned `reticulateSplines()` into a **Toggle Point**. Now if someone is working on a new algorithm they can enable the "use new Algorithm" Feature by uncommenting the `useNewAlgorithm = true` line.

**Important:** You can move from static to dynamic flags by using e.g. a function that does enable and disable feature dynamically. For that reason you can use a **Toggle Router** which can be used to dynamically control which codepath is live. See examples [here](https://martinfowler.com/articles/feature-toggles.html)


---
# Google's vs Facebook's Trunk-Based Development

[Source](https://paulhammant.com/2014/01/08/googles-vs-facebooks-trunk-based-development/)

> Both Google and Facebook insist on code reviews before the commit is accepted into the remote repo’s trunk for all others to use. There’s no mechanism of code review that’s more efficient or effective.

---
## Some other tips & tricks

* All your commits are merged into the trunk as soon as possible, at least once a day. 
* By merging to the trunk so quickly, merge conflicts become very rare. Using short-living branches is one of the tricks to avoid it.
* Trunk based development will also encourage your team to think and work in small steps which lead to small commits that can be merged to the main branch quickly.
* Use feature toggling to have a stable master branch if you push your code into it every day
    + As long as a feature is not ready to be released, it is disabled. That allows us to already push it into the develop branch without breaking anything. 
    +  Developers and manual testers can enable every feature in some settings which are hidden to the normal users.
    + The master branch is always ready to be released because the unfinished features are switched off.
    + Being able to disable features without a new release is a very powerful weapon! [Source](https://team-coder.com/from-git-flow-to-trunk-based-development/)
*  If we want to create a release version we can either do it directly from the master branch or create a release branch for that. The latest released commit is marked with a Git tag.

## Git Tags - Releases etc.

[Source - Video](https://youtu.be/govmXpDGLpo)

* Tagging in Git refers to creating specific points in history of your repository/data
* This is usually done to mark release points e.g. your project is stable and you want to release it, you can create a tag for that (v1.0, v1.1, ...)
* You should create tags if you want to:
    + Mark release points for your code/data
    + To create historic restore points
* How to create tags in git
    1. Chechkout the branch where you want to create the tag `git checkout <branch name>`
    2. Create a tag with some name `git tag <tag name>` e.g. `git tag v1.0` check with `git tag`
        + Annotated tag `git tag -a <tag name> -m "this is a tag for release ver 1.1"`
    3. Display or show tags `git tag` or `git show <tag name>``
    4. Push tags to remote `git push origin <tag name>` - by doing so you create a release in github (you can see your push under release)
        + Push all the tags at once use `git push origin --tags` or `git push --tags`
    5. Delete tags (if required only) `git tag -d <tag name>`or `git tag --delete <tag name>`
        + To delete from remote use `git push origin -d <tag name>`or `git push origin --delete <tag name>`or `git push origin :<tag name`>
* We canot checkout tags in git, but we can create a branch from a tag and checkout the branch with `git checkout -b <branch name> <tag name>`
* If you wan tto create a tag from some past commit you can use this command `git tag <tag name> <refernce of commit>`


![Tags](./images/git-tag-history.png)

---

# Trunk-Based Development

[Source](https://stxnext.com/blog/2018/02/28/escape-merge-hell-why-i-prefer-trunk-based-development-over-feature-branching-and-gitflow/)

TBD rejects any feature branches, hotfix branches, parallel release branches. There is only one branch available to developers - the TRUNK.

There are 4 simple rules for TBD:
1. There is only one branch called the trunk - where developers directly commit.
2. A release manager can create release branches and no one can commit to those
3. Developers commit small changes as often as they can **(deploy a new commit to trunk every day)**
4. Commits should be reviewed and tested and must not destroy the trunk
    + Every commit is a small part of the code, e.g. one function or method with unit tests (green squares)

![TBD](https://stxnext.com/media/filer_public_thumbnails/filer_public/ec/a4/eca4d199-cf64-415a-9342-4dd9759149f5/trunk-based-development-source.png__773x536_q85_crop_subsampling-2_upscale.jpg)

**Note:** At some point, when the trunk branch contains every feature that we want, one person creates a new release branch from the trunk.

## Testing 

* We must cover our feature with tests. There are two possibilities of testing:
    * In the first one, we deliver unit tests for a newly created method or function. Remember, unit tests should cover only the tested function, other functions should be a stub or mock.
    * Another group of tests covers the integration process. At some point, we might write code which uses functions from a separate module. This connection should also be tested.

## Releases

* For companies where new features are delivered to clients rarely (once a month or less), a release manager should create a release branch for every minor version.
* Trunk-Based Development supports semantic versioning (please take a look at the sources section for a great article on this topic). This situation is visualized in the picture below.
* Teams with a very high release cadence, on the other hand, do not need release branches. That is why I did not include "branch" in the title above. They can use the trunk to perform a release. Teams often use commit ids or timestamps as versions of releases. **It may also be a good idea to use a version control mechanism such as tags.**

![Releases](https://stxnext.com/media/filer_public_thumbnails/filer_public/c1/e7/c1e748d3-5aad-4a63-b4aa-2e7acc28b249/branch_for_release.png__726x263_q85_crop_subsampling-2_upscale.png)








