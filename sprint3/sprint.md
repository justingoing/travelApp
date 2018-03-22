# Sprint 3 - *t16* - *Dave Matthews Band*

## Goal

### A mobile, responsive map and itinerary!
### Sprint Leader: *Justin Going*

## Definition of Done

* Web application ready for demo and potential customer release.
* Sprint Review and Restrospectives completed (sprint.md).
* Product Increment release `v3.0` created on GitHub with appropriate version number and name, a description based on the Release Notes template, and the arhived files.
* Version in pom.xml should be `<version>3.0.0</version>`.
* Javadoc and unit tests for public methods.
* ~~Coverage at least 50% overall and for each class.~~

## Policies

* Code adheres to Google style guides for Java and JavaScript.
* Tests and Javadoc are written before/with code.  
* All pull requests include tests for the added or modified code.
* Master is never broken.  If broken, it is fixed immediately.
* Always check for new changes in master to resolve merge conflicts locally before committing them.
* All changes are built and tested before they are committed.
* Continuous integration successfully builds and tests pull requests for master branch always.
* All commits with more than 1 line of change include a task/issue number.
* All Java dependencies in pom.xml.
* All tests must pass before merging to master
* 1 Integration Master branch for each sprint

## Plan

Epics planned for this release.

* *#145 Build a trip from existing information*
* *#67 Give the user an option to view a shorter trip*
* *#146 Design a trip from scratch / manually*
* *#68 Let the user reverse the order of the trip*
* *#69 Let the user choose a new starting location*
* *#66 Give the user the option to choose what information to display in the itinerary*
* *#147 Shorter trips #2*



*Include a discussion of planning decisions made based on your velocity from previous sprints.*
Last sprint it took use some time to hit the ground running. Now that we have gained our bearing, we look to be productive earlier on. Especially with spring
break coming up.

## Metrics

Statistic | Planned | Completed
--- | ---: | ---:
Tasks | Nearest neighbor,Trip title UI functionality, Display search results, Fix failed test case, Add to trip function, Add destination UI, Optimize trip - UI,
Update TFFI for optimization, search bar UI, server side planning, add auto plan functionality, UI planning, search functionality-server| *value*
Story Points | 3, 2, 3, 1, 1, 1, 2, 1, 2 , 2, 3 , 3 | *value*

## Daily Scrums

Date | Tasks done  | Tasks in progress | Impediments
:--- | :--- | :--- | :---
*date* | *@task only* | *@task only* | none
2/22/18 | Developed sprint3 plan |Plan 3 in canvas | none | none
2/28/18 | Further broke down epics into tasks, added new tasks for sql DB integration, broke down epic: let user select destinations for trip | sam - nearest neighbor, Isaac - connect to sql, justin - create search bar, paul - logos on ui, | midterms
2/29/18 | continuing to work on tasks, UI logos completed, nearest neighbor completed, discussed next tasks to be done through the weekend | justin - create search bar, Isaac - connect to sql | None
3/7/18 | coordinated how to merge all our work on the search bar, progress on drag and drop, coordinated how to condense updateTrip | isaac - continuing on DB, Justin - waiting changes to Destinations.js to complete search-bar, paul - working on options, sam - 2opt, drag and drop, working on tffi format |
3/8/18 | search bar complete, discussed what to accomplish next, coordinated on future plans for displaying in trip | tweaking existing code, planning display search in table |
3/20/18 | coordinating what is left to be completed, redistributing tasks for completion, audit issues to be closed | justin - display search results sam - drag and drop, ike - server and travis completion | dustin' the rust off from spring break


## ReviewUI
#### Completed epics in Sprint Backlog
* *none*

#### Incomplete epics in Sprint Backlog
* *#145 Build a trip from existing information*
* *#67 Give the user an option to view a shorter trip*

#### What went well
* *Teamwork and communication - we continue to keep an open stream of coordination and communication*
* *Improving on our ability to break things down into small "bite sized" tasks*

#### Problems encountered and resolutions
* *Conflicting code: working on the same issues Resolution: pull down issues on zenhub and work on those issues*

## Retrospective

Topic | Teamwork | Process | Tools
:--- | :--- | :--- | :---
What we will change this time | Hold each other accoutable for testing | Double check our deplloyment and releases |Github release and checkin server
What we did well | we got a great jump on this sprint,  were good at communicating and meeting up | continually meetup for scrum | pretty good at cleaning up code climate
What we need to work on | were pretty good at teamwork | more commits, more zenhub coordination |learn more about travis
What we will change next time | continue to meetup regularly, get better at splitting up tasks | continue to start tasks early | more testing. learning about JS testing next sprint.
