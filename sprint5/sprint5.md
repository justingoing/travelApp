# Sprint 5 - *16* - *Dave Matthews Band*

## Goal

### Great User Experience, Interoperability
### Sprint Leader: *Paul Barstad*

## Definition of Done

* Web application deployed on the production server (kiwis.cs.colostate.edu).
* Sprint Review and Restrospectives completed (sprint.md).
* Product Increment release `v5.0` created on GitHub with appropriate version number and name, a description based on the Release Notes template, and the archived files.
* Version in pom.xml should be `<version>5.0</version>`.
* Javadoc and unit tests for public methods.
* Tests for database and REST APIs.
* Coverage at least 50% overall and for each class.

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

## Plan

Epics planned for this release.

* Revamp Itinerary
* Redo-UI
* TFFI Update
* Interop
* Shorter Trips #3
* Staff Page
* System Testing
* Speed up Computation on the Server
* Save Options as Defaults for Future Use

Our estimate was fairly accurate in Sprint 4 as we aimed for roughly 
60 story points. We are aiming for around 50 this sprint as we still 
are underestimating tasks. We want to focus heavily on creating the best UI possible.

## Metrics

Statistic | Planned | Completed
--- | ---: | ---:
Tasks |  24   | 22 
Story Points |  55  | 113 

## Daily Scrums

Date | Tasks done  | Tasks in progress | Impediments 
:--- | :--- | :--- | :--- 

 04/17 | 2 | #298, #312, #302, #160, #114, #321 | none
 04/18 | 2 | #298, #312, #302, #160, #114, #321 | none
 04/19 | 18  | #331, #328, #306, #290, #321 | none (several duplicate tasks)
 04/22 | 30 | #321, #328, #331 | none
 04/24 | 32 | #296, #327, #321, #331, #330 | none
 04/26 | 46 | #281. #313, #330, #331, #365 | none
 04/30 | 46 | #281. #313, #330, #331, #365 | none
 05/02 | 61 | none | none
 

## Review

#### Completed epics in Sprint Backlog 
* Revamp Itinerary : Changed itinerary to horizontal, allowed user to click for more information.
* Redo-UI : Made the most user-friendly UI we could imagine.
* TFFI Update : Added limits, optimizations.
* Interop : Tested multiple teams, with our Config, Query, and Plan APIs.
* Shorter Trips #3 : 3-opt Completed.
* Staff Page : Added our pictures with links to resumes.
* System Testing : Implemented.
* Save Options as Defaults for Future Use : Cookies enabled.

#### Incomplete epics in Sprint Backlog 
* Speed up Computation on the Server : Did not have a chance to multithread.

#### What went well
* Re-did UI early in the sprint allowing us to focus on interop later in the sprint.
* Pick up tasks and finish them quickly
* Communication allowed us to avoid merge conflicts much better than previous sprints.

#### Problems encountered and resolutions
* Jest testing was a struggle. Googling eventually gave us some insight.
* We chose to change the initial template of UI layout to increase user friendliness.


## Retrospective

Topic | Teamwork | Process | Tools
:--- | :--- | :--- | :---
What we will change this time | More regular meetings | Continue breaking down tasks into manageable sizes. | Continue using GitHub to communicate and do code reviews.
What we did well | Communicate, and work together to accomplish tasks | We planned well, completing good chunks of story points out at a time. | Learned Jest, used IntelliJ testing.
What we need to work on | Nothing | Don't code day of deployment | Jest

