# Github Flow

[Understanding the GitHub Flow](https://guides.github.com/introduction/flow/)

1. Create a branch: When you creating a branch in your project, you are creating an environment where you can try out new ideas. Changes you make on a branch don't affect the `master` branch, so you are free to experiment and commit changes. Your branch won't be merged until someone has reviewed your changes.

**Note:** There's only one rule: anything in the master branch is always deployable. Because of this, it's extremely important that your new branch is created off of master when working on a feature or a fix.

2. Add commits: Once your branch has been created, it's time to start making changes. Whenever you add, edit or delete a file, you are making a commit, and adding them to your branch. Each commit is considered as a separate unit of change. This lets you roll back if a bug is found.

3. Open a pull request: Pull requests initiate discussion about your commits. Because they're tightly integrated with the underlying Git repository, anyone can see exactly what changes would be merged if they accept your request. You can open a pull request at any point during the development process. 

**Note:** Pull requests help start code review and conversation about proposed changes before they're merged into the master branch. Pull requests are a mechanism for a developer to notify team members that they have completed a feature. Once their feature branch is ready, the developer files a pull request.

* A developer creates the feature in a dedicated branch in their local repo.
* The developer pushes the branch to a public Bitbucket/Github repository.
* The developer files a pull request via Bitbucket/Github.
* The rest of the team reviews the code, discusses it, and alters it.
* The project maintainer merges the feature into the official repository and closes the pull request. [Source](https://www.atlassian.com/git/tutorials/making-a-pull-request)

4. Discuss and review your code: Once a pull request has been opened, the person reviewing your changes may have questions or comments. Pull requests are designed to encourage this type of conversation. You can also continue to push to your branch in light of discussion and feedback about your comments. 

5. Deploy: you can deploy from a branch for final testing in production before merging into master. Once your pull request has been reviewed and the branch passes your tests, you can deploy your changes to verify them in production.

6. Merge: Now that your changes has been verified in production, it is time to merge your code into the master branch. 

**Note:** By incorporating certain keywords into the text of your Pull Requests, you can associate issues with your code. When your Pull Request is merged, the related issues are also closed. For example `Closes #32` would close issue number 32 in the repository.


## Step-by-Step Tutorial

- Begin by doing a git pull to get the latest content on your master branch
- Run "git branch your-feature-name" to make a git branch
- Code in your changes, add and commit the files
- Pull the master branch again and merge it with your new branch
- Push the branch up to github and submit it as a pull request
- That pull request can now receive comments and code discussion, as well as accept new commits before being merged in with the master branch