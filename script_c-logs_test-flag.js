let DateTime = luxon.DateTime;

document.addEventListener('DOMContentLoaded', function() {

    resetPlanner();

    function resetPlanner() {

        let date = new Date();
        let now = DateTime.local();
        let fancyDate = DateTime.local().toFormat('ffff');

        let test = true;

        let thisHour24 = DateTime.local().toFormat('H');
        let thisHour12 = DateTime.local().toFormat('h');
        let currentHour = DateTime.local().toFormat('tt');

        if (test) {
            thisHour24 = 13;
            thisHour12 = 1;
        };

        let storedPlanner = JSON.parse(localStorage.getItem("storedPlanner"));

        if (test) { console.log(storedPlanner); };

        // If plans were retrieved from localStorage, update the plan array to it
        if (storedPlanner !== null) {
            plansArray = storedPlanner;
        } else {

            plansArray = new Array(9).fill(" ");
            plansArray[0] = "Join Class Zoom Call!";
            // plansArray[1, 2, 3, 4, 5, 6, 7, 8] = [" ", " ", " ", " ", " ", " ", " ", " ", ]

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
            newRow.className = "row time-block";
            newRow.setAttribute("hour-value", i)
            planner.appendChild(newRow);

            let hourCol = document.createElement("div");
            hourCol.className = "col-2 col-sm-2 col-md-2 hour";
            let hourSpan = document.createElement("span");
            hourSpan.setAttribute("hour-value", i)
            hourSpan.className = "hourSpan";

            let hourText = 0;
            let amPm = "";
            if (hour > 12) {
                hourText = hour - 12 + ":00 ";
                amPm = "PM";
            } else {
                hourText = hour + ":00 ";
                amPm = "AM";
            };

            hourSpan.textContent = hourText + amPm;

            newRow.appendChild(hourCol);
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
            saveIcon.className = "far fa-save fa-2x pt-4  pr-2 save";
            saveIcon.id = "saveId-" + i;
            saveIcon.setAttribute("save-Id", i);

            newRow.appendChild(saveBtnDiv);
            saveBtnDiv.appendChild(saveIcon);

            // set row color based on time
            pastPresentFutureColor(newRow, hour);
            currentHourText(hourSpan, hour);
            // add row to planner container

        };


        function pastPresentFutureColor(newRow, hour) {
            // let newRowClass = newRow.getAttribute("class");
            if (test) { console.log("rowColor ", thisHour24, hour); }

            if (hour < thisHour24) {
                // $hourRow.css('')
                if (test) { console.log("lessThan"); }
                newRow.className += " " + "past";
            } else if (hour > thisHour24) {
                if (test) { console.log("greaterThan"); }
                newRow.className += " " + "future";
            } else {
                if (test) { console.log("eqaul"); }
                newRow.className += " " + "present";
            }
        };

        function currentHourText(hourSpan, hour) {
            // let newRowClass = newRow.getAttribute("class");
            if (hour < thisHour24) {
                // $hourRow.css('')
                hourSpan.className = "hourSpan";
            } else if (hour > thisHour24) {
                hourSpan.className = "hourSpan";
            } else {
                // $hourRow.css('')
                hourSpan.className += " " + "currentHour";
                hourSpan.textContent = currentHour;
            };
        };


        let icon = ".save";
        let icons = document.querySelectorAll(icon);
        icons.forEach(function(icon) {
            icon.addEventListener("click", function(event) {
                event.preventDefault();
                const targetIcon = event.target;

                // if (test) { console.log('click pta before ' + plansArray); }

                let index = targetIcon.getAttribute("save-Id");

                let plannerInput = document.querySelector('#input-' + index);
                let value = plannerInput.value;

                plansArray[index] = value;

                if (test) { console.log('value ', value); };
                if (test) { console.log('index ', index); };
                if (test) { console.log('click pta after ' + plansArray); };

                // remove shawdow pulse class
                document.querySelector("#saveId-" + index).classList.remove("flashingSaveThis");
                localStorage.setItem("storedPlanner", JSON.stringify(plansArray));
            });
        })


        let input = ".plannerInput";
        let inputs = document.querySelectorAll(input)
            // function to color save button on change of input
        inputs.forEach(function(input) {
            input.addEventListener('change', function(event) {
                event.preventDefault();
                const targetInput = event.target;

                if (test) { console.log('onChange'); }
                if (test) { console.log('id', targetInput.getAttribute("hour-value")); }

                // neeed to check for save button

                let x = targetInput.getAttribute("hour-value");

                // add shawdow pulse class
                document.querySelector("#saveId-" + x).classList.add("flashingSaveThis");
            });
        });


        updateTime();

        function updateTime() {
            var fancyDate = DateTime.local().toFormat('DDDD -') + DateTime.local().toFormat(' ttt');

            let dateTimeSubtitle = document.querySelector('#navbar-subtitle');
            dateTimeSubtitle.textContent = fancyDate;
            let currentHour = DateTime.local().toFormat('tt');
            let currentHourSpan = document.querySelector('.currentHour')
            currentHourSpan.textContent = currentHour;
        };
        setInterval(updateTime, 1000);


        everyHourOnTheHour();

        function everyHourOnTheHour() {
            //get the mins of the current time
            var mins = DateTime.local().toFormat('mm' + 'ss');
            if (mins == "0000") {
                resetPlanner();
            };
        };
        setInterval(everyHourOnTheHour, 1000);
    };
});