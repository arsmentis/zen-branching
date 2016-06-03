# Zen Branching

A path of least resistance branching workflow for small teams



## Who I Am

* <!-- .element: class="fragment" data-fragment-index="1" --> James Kruth - owner of [Ars Mentis](https://www.arsmentis.com) Custom Software and IT Consulting
* Professional experience with git since 2009 <!-- .element: class="fragment" data-fragment-index="2" -->
* Ten years of experience using various version control solutions with small (5-10 member) teams <!-- .element: class="fragment" data-fragment-index="3" -->


## Who This Is For

Individuals and small teams with: <!-- .element: style="float: left" -->

* Beginning to intermediate knowledge of git <!-- .element: class="fragment" data-fragment-index="1" -->
* Generally working on 1 or 2 lines of development <!-- .element: class="fragment" data-fragment-index="2" -->
* Relatively simple server environments <!-- .element: class="fragment" data-fragment-index="3" -->


## Who This Isn't For

* Projects with many simultaneous lines of development <!-- .element: class="fragment" data-fragment-index="1" -->
* Deployment schemes requiring a branch per environment <!-- .element: class="fragment" data-fragment-index="2" -->
* People who like kitchen sink style solutions <!-- .element: class="fragment" data-fragment-index="3" -->
* People who love branching <!-- .element: class="fragment" data-fragment-index="4" -->



## Core Principals

* <!-- .element: class="fragment" data-fragment-index="1" --> The `master` branch is always your development branch
* <!-- .element: class="fragment" data-fragment-index="2" --> Tag *all* releases
* Version files should reflect current work <!-- .element: class="fragment" data-fragment-index="3" -->


## `master` is Development

* It's the git default (path of least resistance) <!-- .element: class="fragment" data-fragment-index="1" -->
* Easy to setup continuous integration (who broke the build?!) <!-- .element: class="fragment" data-fragment-index="2" -->
* Easy to setup continuous deployment (no more deploying to development) <!-- .element: class="fragment" data-fragment-index="3" -->
* If you use GitHub or GitLab it's the initial view <!-- .element: class="fragment" data-fragment-index="4" -->


## Tag *All* Releases

* Yes, every release - even testing and QA releases <!-- .element: class="fragment" data-fragment-index="1" -->
* <!-- .element: class="fragment" data-fragment-index="2" --> Use annotated (not lightweight) tags:<br>
`git tag -a v1.2.0 -m 'Version 1.2.0'`
* <!-- .element: class="fragment" data-fragment-index="3" --> Remember to push tags:<br>
`git push --tags`


## Version Files Should Reflect Current Work

* <!-- .element: class="fragment" data-fragment-index="1" --> The initial commit on any branch should update files containing versions
* <!-- .element: class="fragment" data-fragment-index="2" --> The same goes for the first commit after tagging
* <!-- .element: class="fragment" data-fragment-index="3" --> Example:
  * `git tag -a v0.3.0 -m 'Version 0.3.0'`
  * Update files containing versions (change logs, package.json, etc...) to v0.4.0
  * `git add package.json`<br>
    `git commit -m 'Working on v0.4.0'`



## Semantic Versioning - a brief diversion

* <!-- .element: class="fragment" data-fragment-index="1" --> Semantic Versioning (http://semver.org/) is a common versioning system
* <!-- .element: class="fragment" data-fragment-index="2" --> A sane versioning standard makes tagging much easier
* <!-- .element: class="fragment" data-fragment-index="3" --> Examples:
  * v1.2.0 - release of v1.2
  * v1.2.1 - bugfix of v1.2
  * v1.3.0 - release of v1.3 - new backwards compatible features
  * v2.0.0 - release of v2 - breaking changes from v1
  * v2.1.0-beta - a beta (testing) release of v2.1



## In a Perfect World

<canvas id="gg-perfect-world"></canvas>

<!-- .element: class="fragment" data-fragment-index="1" --> Your code is bug free, right? :)



## Bugs in Releases

* <!-- .element: class="fragment" data-fragment-index="1" --> They happen
* <!-- .element: class="fragment" data-fragment-index="2" --> Generally after you've started work on the next version
* <!-- .element: class="fragment" data-fragment-index="3" --> How do we fix a bug in v1.1.0 after we've started working on v1.2.0?


## Branching

* <!-- .element: class="fragment" data-fragment-index="1" --> Create a maintenance branch from your release tag:<br>
`git checkout v1.1.0`<br>
`git checkout -b v1.1-maint`
* <!-- .element: class="fragment" data-fragment-index="2" --> Naming maintenance branches: append `-maint` after the release you will be maintaining, for example:
  * v1.2-maint
  * v2.7-maint
  * v1-maint (not recommended)


## Fixing the Bug

* <!-- .element: class="fragment" data-fragment-index="1" --> Commit your version file changes first:<br>
`git commit -m 'Working on v1.1.1'`
* <!-- .element: class="fragment" data-fragment-index="2" --> Commit your fixes:<br>
`git commit -m 'Add missing save button'`
* <!-- .element: class="fragment" data-fragment-index="3" --> Test!
* <!-- .element: class="fragment" data-fragment-index="4" --> Tag and release:<br>
`git tag -a v1.1.1 -m 'Version 1.1.1'`


## A Not So Perfect World

<canvas id="gg-not-perfect-1"></canvas>


## Merging Changes Back Into Master

* <!-- .element: class="fragment" data-fragment-index="1" --> Fixes can easily be merged back into master:<br>
`git checkout master`<br>
`git merge v1.1-maint`
* <!-- .element: class="fragment" data-fragment-index="2" --> Fix merge conflicts on version files


## Merge Conflicts

```diff
<<<<<<< HEAD
v1.2
||||||| merged common ancestors
=======
v1.1.1
>>>>>>> v1.1-maint
```

Becomes

```diff
v1.2
```


## The Final Tree

<canvas id="gg-not-perfect-2"></canvas>



## Some Additional Items

* <!-- .element: class="fragment" data-fragment-index="1" --> Checking out releases
* <!-- .element: class="fragment" data-fragment-index="2" --> Feature branches


## Checking Out Releases

* <!-- .element: class="fragment" data-fragment-index="1" --> Releases can be deployed by checking out the tag:<br>
`git checkout v1.2.0`
* <!-- .element: class="fragment" data-fragment-index="2" --> This leaves you in a detached head state - not a problem if aren't making changes on your server
* <!-- .element: class="fragment" data-fragment-index="3" --> If you want to check out a newer version, first fetch (not pull) and then checkout:<br>
`git fetch && git checkout v1.3.0`
* <!-- .element: class="fragment" data-fragment-index="4" --> Don't forget to disallow public access to your .git folder if you are on a public server


## Feature Branches

* <!-- .element: class="fragment" data-fragment-index="1" --> Sometimes development work needs to be isolated
* <!-- .element: class="fragment" data-fragment-index="2" --> Keep feature branches local and as small as possible
  * If you feel the need to push your branch, try to break the work up into smaller changes, if possible
  * Collaboration is good reason for pushing
  * Rules are made to be broken
* <!-- .element: class="fragment" data-fragment-index="3" --> Regularly merge `master` into `feature`:<br>
`git merge master`
* <!-- .element: class="fragment" data-fragment-index="4" --> When complete, merge your branch back into `master`:<br>
`git merge feature`



# Questions?



## References

* Basic git:
  * Tagging - https://git-scm.com/book/en/v2/Git-Basics-Tagging
  * Branching - https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging
* Created with:
  * reveal.js - https://github.com/hakimel/reveal.js
  * gitgraph.js - http://gitgraphjs.com/
* Presentation: https://www.arsmentis.com/zen-branching/
