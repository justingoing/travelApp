# Sprint 2 - *t16* - *Dave Matthews Band*

## Goal

### A mobile, responsive map and itinerary!
### Sprint Leader: *Isaac Gentz*

## Definition of Done

* Web application ready for demo and potential customer release.
* Sprint Review and Restrospectives completed (sprint.md).
* Product Increment release `v2.0` created on GitHub with appropriate version number and name, a description based on the Release Notes template, and the arhived files.
* Version in pom.xml should be `<version>2.0.0</version>`.
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

* *#64 Let the user save the trip*
* *#63 Plan trip in destination user provided*
* *#65 Give user option of miles or kilometers for the unit of distance*
* *#58 Plan trips in state of colorado*
* *#59 Let user load a file with destination*
* *#61 Show itinerary of the round trip*
* *#62 Show a map of the round trip*


*Include a discussion of planning decisions made based on your velocity from previous sprints.*
Will start this in sprint3 once we have velocity data from sprint2

## Metrics

Statistic | Planned | Completed
--- | ---: | ---:
Tasks |  Fix Regex, TFFI Loader, TFFI File Sender, TFFI Parse Backend, TFFI File Loader, UI For Saving, TFFI Frontend Creator, SVG Displa, SVG Parse, Bounding Box, Tweak UI for Multiple Destinations, SVG Loader  | *value* 
Story Points |  2, 2, 3, 3, 8, 2, 5, 3, 3, 8, 3, 3, 13  | *value* 

## Daily Scrums

Date | Tasks done  | Tasks in progress | Impediments 
:--- | :--- | :--- | :--- 
*date* | *@task only* | *@task only* | none
2/6/18 |Streamlined tasks after seeing new code |Save File #78, Display Trip in Table/Itinerary #85, JSOn Validate Check (Client) #81, SVG Display #75 | Learn new code from TripCo executives 
2/8/18 |Streamlined tasks after seeing new code |Save File #78, Display Trip in Table/Itinerary #85, JSOn Validate Check (Client) #81, SVG Display #75 | Learn new code from TripCo executives 
2/11/18 |Streamlined tasks after seeing new code |Save File #78, Display Trip in Table/Itinerary #85, JSOn Validate Check (Client) #81, SVG Display #75 | Learn new code from TripCo executives 
2/15/18 |  #101, #97, #96, #78, #86, #94 | #99, #95, #85, #81, #100, #75 | none
2/18/18 | #138,#135,#63,#134,#58,#65,#112,#62,#137,#136,#130,#129,#133,#128,#132,#131,#122,#103,#127,#109,#126,#125,#124,#115,#121,#102,#123,#57,#120,#108,#73,#119,#116,#117,#104,#75,#113,#100,#105,#59,#81,#64 | none | none
## Review

#### Completed epics in Sprint Backlog 
* *#60 Let user load a file with destinations*:  *Sam got this knocked out pretty quickly*
* *#63 plan the trip in the order the user provided*
* *#57 Plan trips in the state of colorado*
* *#65 Give user option of iles or kilometers*
* *#62 Show map of the round trip*
* *#59 Let user load a file with destination*
* *#64 Let user save their trip
#### Incomplete epics in Sprint Backlog 
* *#61 Show an itinerary of the round trip*: *We had trouble working with the tables in React and decided to go with the default behavior*
*

#### What went well
* *Teamwork and communication*
*

#### Problems encountered and resolutions
* *We didn't submit our final submission to kiwis correctly | We resolved this by having a meeting with Dave during office hours and discussing options*
*

## Retrospective

Topic | Teamwork | Process | Tools
:--- | :--- | :--- | :---
What we will change this time | Keep communicating well | Smaller branches, 1 merge per epic |  Learn CI and JavaScript/React
What we did well | Breaking tasks down well | Good communication, able to meet frequently Breaking down tasks well. Good code review | Zenhub 
What we need to work on | Dont assign tasks to someone until they decide to take it from the backlog | Same as previous | Make sure Zenhub tasks are assigned by person grabbing the task
What we will change next time | Hold each other accoutable for testing | Double check our deplloyment and releases | Github release and checkin server 
