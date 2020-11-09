# Dynamic Day Planner

### 05 Third-Party APIs: Work Day Scheduler
Dynamic Day Planner - html, css, javascript, jQuery. Create and Save day planner events.

#### Developer: David Harris
email: jdh.programmer@gmail.com - 
github: https://github.com/jdhprogrammer

Project Repository: https://github.com/jdhprogrammer/Dynamic_Day_Planner

Project Deployment: http://www.jdhprogrammer.com/Dynamic_Day_Planner/

### Notes a.k.a Commits

11/7 2:56PM - "index.html looking like Demo, need to recreate using javascript and make it dynamic. Researched Moment and new Luxon for hours. using Luxon for this assignment. have live date and time in page header"

-- really bad ad commiting when i get going for hours and hours. added lots of lines of JS. getting ideas and help on sections from different google searches and stack overflow. still had for me to write totally from scratch.

-- all code written... currently debugging finding faults in javascript.

-- 2nd time I have been working for 12 hours straight... and just forgot to go an submit Homework before Midnight.

-- all Javascript working. page populating beautifully. had lots of bugs but found them all. added hover states, flashing save button, changed colors of items, etc.

-- removed console logs and test flag from script.js... fixed reset every hour. everything working

-- found a bug with live current hour label. fixed it.

-- Noticed 12:00pm was displaying as 12AM... fixed with additional if statement. Cleaned up README, added screenshots.


## Your Task

Create a simple calendar application that allows a user to save events for each hour of the day by modifying starter code. This app will run in the browser and feature dynamically updated HTML and CSS powered by jQuery or VanillaJS (~Dane - Instructor).


## User Story

```
AS AN employee with a busy schedule
I WANT to add important events to a daily planner
SO THAT I can manage my time effectively
```


## Acceptance Criteria

```
GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
THEN the current day is displayed at the top of the calendar
WHEN I scroll down
THEN I am presented with time blocks for standard business hours
WHEN I view the time blocks for that day
THEN each time block is color-coded to indicate whether it is in the past, present, or future
WHEN I click into a time block
THEN I can enter an event
WHEN I click the save button for that time block
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist
```

### Screenshots

![Screenshot of  Work Day Scheduler](Assets/Screenshots/Work_day_Scheduler.jpeg?raw=true "Word Day Scheduler, color coded rows and columns, 9am - 5pm, save buttons")
![Screenshot of  Save button flashes yellow/orange](Assets/Screenshots/New_unsaved_planner_item_savebutton-flashing.jpeg?raw=true "Save button flashes yellow/orange")
![Screenshot of  Save button saves to Local Storage](Assets/Screenshots/click_save_saves_localStorage.jpeg?raw=true "Save button saves to Local Storage")
![Screenshot of  Current time diplayed in Current hour slot](Assets/Screenshots/current-time-displayed-in-curent-hour.jpeg?raw=true "Current time diplayed in Current hour slot")