Sprint 4 - *16* - *Dave Matthews Band*

## Goal

### Worldwide!
### Sprint Leader: *Samuel Kaessner*

## Definition of Done

* Web application deployed on the production server (kiwis.cs.colostate.edu).
* Sprint Review and Restrospectives completed (sprint.md).
* Product Increment release `v4.0` created on GitHub with appropriate version number and name, a description based on the Release Notes template, and the archived files.
* Version in pom.xml should be `<version>4.0</version>`.
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

* Filtered Searches
* Zoom and Pan the map
* Distance Unit Configuration
* Branding
* Plan Trips outside of Colorado
* System Testing

We missed our milestone slightly from last time, so we bit off
a bit less this time, especially since we have less time. 
Additionally, we are going to try to be more realistic with our 
estimations, since last time a lot of the tasks were underestimated. 

## Metrics

Statistic | Planned | Completed
--- | ---: | ---:
Tasks |  31   | 0
Story Points |  55 | 0 

## Daily Scrums

Date | Tasks done  | Tasks in progress | Impediments 
:--- | :--- | :--- | :--- 
03/25 | 0 | #217, #218 | none
03/27 | 2 | #217, #218 | none
03/28 | 4 | #219, #216 | none
04/04 | 13 | #237, #245, #114 | none
04/08 | 21 | #246, #241, #261, #160, #114 | none
04/11 | 26 | none | none


## Review

#### Completed epics in Sprint Backlog 
* *user story*:  *comments*
* Filtered Searches : Added a single filter and created the underlying architecture.
* Speed up computation on server : Re-wrote two-opt. Made tons faster.
* Distance Unit configuration : Added correct distance support, as well as user defined units.
* Improve the user experience : Lots of UI tweaks
* Zoom and Pan the map : Added Google maps
* Plan trips outside of colorado : allowed destinations outside colorado
* API configuration : Updated TFFI to v3

#### Incomplete epics in Sprint Backlog 
* *user story*: *explanation...*
* System Testing : Just ran out of time, decided to focus on other things.

#### What went well
* Re-writing two-opt. 
* Pair programming was great.
* Everyone took ownership of their issue(s), and got them done efficiently.
* Good balance of solving problems individually, and asking team for help.


#### Problems encountered and resolutions
* Travis still having issues, and can't test DB code. Not resolved yet. 
* Lots of conflicts with other classes, health, and vacations. Resolved by putting in longer hours
at the end.


## Retrospective

Topic | Teamwork | Process | Tools
:--- | :--- | :--- | :---
What we will change this time | Use Code reviews more. | Break up tasks into smaller chunks. | Keep learning Git and github. 
What we did well | Meshed well and pulled everything together well. | Did better planning, made sure to pull down issues in Zenhub before working on them. | Did well sharing tool knowledge across team, like HTTP test stuff. 
What we need to work on | Sharing knowledge among the team. | Continue using code reviews. | Better use of system testing.
What we will change next time | More regular meetings | Continue breaking down tasks into manageable sizes. | Continue using GitHub to communicate and do code reviews.
