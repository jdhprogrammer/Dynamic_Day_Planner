let DateTime = luxon.DateTime;

$(document).ready(function() {

    let date = new Date();
    let now = DateTime.local();
    let fancyDate = DateTime.local().toFormat('ffff');

    let test = false;

    let thisHour24 = DateTime.local().toFormat('H');
    let thisHour12 = DateTime.local().toFormat('h');

    if (test) {
        thisHour24 = 13;
        thisHour12 = 1;
    };

    let storedPlanner = JSON.parse(localStorage.getItem("storedPlanner"));

    if (test) { console.log(storedPlans); };

    // If plans were retrieved from localStorage, update the plan array to it
    if (storedPlanner !== null) {
        plansArray = storedPlanner;
    } else {

        plansArray = new Array(9);
        plansArray[0] = "Join Class Zoom Call!";
    };

    if (test) { console.log("full array of plned text", plansArray); };


    let planner = document.querySelector("#thePlanner");
    clearContent();

    function clearContent() {
        document.querySelector("#thePlanner").innerHTML = "";
    }

    if (test) { console.log("current time", thisHour12); }

    // console.log(date);
    // console.log(now)
    // console.log(now.hour);
    // console.log(fancyDate);


    for (let hour = 9; hour <= 17; hour++) {
        const i = hour - 9;


        var newRow = document.createElement("div");
        newRow.className = "class", "row time-block";
        newRow.setAttribute("hour-value", i)

        let hourCol = document.createElement("div");
        hourCol.className = "col-2 col-sm-2 col-md-2 hour";
        let hourSpan = document.createElement("span");
        hourSpan.className = "hourSpan";

        let hourText = 0;
        let amPm = "";
        if (hour > 12) {
            hourText = hour - 12;
            amPm = "PM";
        } else {
            hourText = hour;
            amPm = "AM";
        };

        hourSpan.textContent = hourText + amPm;

        planner.appendChild(hourCol);
        hourCol.appendChild(hourSpan);

        let inputDiv = document.createElement("div");
        inputDiv.className = "col-8 col-sm-8 col-md-9 textarea";

        let plannerInput = document.createElement("input");
        plannerInput.id = "input-" + i;
        plannerInput.setAttribute("hour-value", i);
        plannerInput.setAttribute("type", "text");
        plannerInput.className = "plannerInput";

        plannerInput.value = plansArray[i];

        newRow.appendChild(inputDiv);
        inputDiv.appendChild(plannerInput);

        let saveBtnDiv = document.createElement("div");
        saveBtnDiv.className = "col-2 col-sm-2 col-md-1 saveBtn";

        let saveIcon = document.createElement("i");
        saveIcon.className = "far fa-save save";
        saveIcon.id = "saveId-" + i;
        saveIcon.setAttribute("save-Id", i);

        newRow.appendChild(saveBtnDiv);
        saveBtnDiv.appendChild(saveIcon);

        // set row color based on time
        pastPresentFutureColor(newRow, hour);

        // add row to planner container
        planner.appendChild(newRow);
    };


    function pastPresentFutureColor(newRow, hour) {

        if (test) { console.log("rowColor ", thisHour24, hour); }

        if (hour < thisHour24) {
            // $hourRow.css('')
            if (test) { console.log("lessThan"); }
            newRow.className = "past";
        } else if (hour > thisHour24) {
            if (test) { console.log("greaterThan"); }
            newRow.className = "present";
        } else {
            if (test) { console.log("eqaul"); }
            newRow.className = "future";
        }
    };




    document.addEventListener("click", function(event) {
        event.preventDefault();
        const icon = closest(".save");
        if (test) { console.log('click pta before ' + plansArray); }

        let index = icon.getAttribute("save-Id");

        let plannerInput = '#input-' + index;
        let value = plannerInput.value;

        plansArray[index] = value;

        if (test) { console.log('value ', value); };
        if (test) { console.log('index ', index); };
        if (test) { console.log('click pta after ' + plansArray); };

        // remove shawdow pulse class
        document.querySelector("#saveId-" + index).classList.remove("shadowPulse");
        localStorage.setItem("storedPlanner", JSON.stringify(plansArray));
    });


    // function to color save button on change of input
    document.addEventListener('change', 'input', function(event) {
        event.preventDefault();
        if (test) { console.log('onChange'); }
        if (test) { console.log('id', this.getAttribute("hour-value")); }

        // neeed to check for save button

        let x = this.getAttribute("hour-value");

        // add shawdow pulse class
        document.querySelector("#saveId-" + x).classList.add("shadowPulse");
    });


    updateTime();

    function updateTime() {
        var fancyDate = DateTime.local().toFormat('DDDD -') + DateTime.local().toFormat(' ttt');

        let dateTimeSubtitle = document.querySelector('#navbar-subtitle');
        dateTimeSubtitle.textContent = fancyDate;
    }
    setInterval(updateTime, 1000);

});