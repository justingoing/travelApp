# Inspection - Team *T16* 
 
Inspection | Details
----- | -----
Subject | *Trip.java - What functions should be moved into separate files? (Specifically look at SVG and Parsing functions) - Also could convertToDecimal and getLegAsSVG be optimized? They are both really long*
Meeting | *April 24, 3:30 PM, Stadium*
Checklist | *reference, URL, etc.* *uh, what?*

### Roles
Name | Role | Preparation Time
---- | ---- | ----
Paul | Maintainer | 30 min
Sam | Tester | 30 min 
Justin | End User| 30 min 
Isaac | Moderator | 30 min

### Log
file| line | defect | h/m/l | who found | github# 
--- | --- |:---:|:---:| ---
Trip.java |N/A |Need separate SVG class | m |ikegentz | #343
Trip.java |79,103,153,168,178,192,216,230 |move these functions to new SVG class | m |ikegentz/Justin |#345
Trip.java |59 |The optimization level is incorrect, should be .75 | h | Sam/Paul | #348
Trip.java |202 | getMappedCoords has redundant variables | l | Sam | #349
Trip.java |N/A | Remove commented lines throughout the whole file | m | Sam/Paul | #350
Trip.java |241 | Remove colorado svg | l | Sam | #351
Trip.java |30 | DefaultSVG is sent to client and should not be | l | Paul | #340
Trip.java |195, 196 |transX and transY are not necessary | l | Paul | cd .#352
Trip.java |103 | Refactor getLegsAsSVG | m | Justin | #353
Trip.java |350 | Restructure convertToDecimal | m | Justin |#354

