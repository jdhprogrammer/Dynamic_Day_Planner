let DateTime = luxon.DateTime;

document.addEventListener('DOMContentLoaded', function() {

    resetPlanner();

    function resetPlanner() {

        let test = false;

        let date = new Date();
        let now = DateTime.local();
        let fancyDate = DateTime.local().toFormat('ffff');

        let thisHour24 = DateTime.local().toFormat('H');
        let thisHour12 = DateTime.local().toFormat('h');
        let currentHour = DateTime.local().toFormat('tt');
        let currentHourTest = false;

        if (test) {
            thisHour24 = 13;
            thisHour12 = 1;
        };

        let storedPlanner = JSON.parse(localStorage.getItem("storedPlanner"));


        // If plans were retrieved from localStorage, update the plan array to it
        if (storedPlanner !== null) {
            plansArray = storedPlanner;
        } else {

            plansArray = new Array(24).fill(" ");
            plansArray[10] = "Join Class Zoom Call!";
            // plansArray[1, 2, 3, 4, 5, 6, 7, 8] = [" ", " ", " ", " ", " ", " ", " ", " ", ]

        };


        let planner = document.querySelector("#thePlanner");
        clearContent();

        function clearContent() {
            document.querySelector("#thePlanner").innerHTML = "";
        }


        for (let hour = 0; hour <= 23; hour++) {
            const i = hour;

            let newRow = document.createElement("div");
            newRow.className = "row time-block";
            newRow.setAttribute("hour-value", i)
            planner.appendChild(newRow);

            let hourCol = document.createElement("div");
            hourCol.className = "col-2 col-sm-2 col-md-2 hour";
            let hourSpan = document.createElement("span");
            hourSpan.setAttribute("hour-value", i)
            hourSpan.className = "hourSpan";

            let hourText = "";
            let amPm = "";

            if (hour === 0) {
                hourText = hour + 12 + ":00";
                amPm = "AM";
            } else if (hour > 12) {
                hourText = hour - 12 + ":00 ";
                amPm = "PM";
            } else if (hour === 12) {
                hourText = hour + ":00";
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


            pastPresentFutureColor(newRow, hour);
            currentHourText(hourSpan, hour);


        };


        function pastPresentFutureColor(newRow, hour) {

            if (hour < thisHour24) {
                newRow.className += " " + "past";
            } else if (hour > thisHour24) {
                newRow.className += " " + "future";
            } else {
                newRow.className += " " + "present";
            }
        };

        function currentHourText(hourSpan, hour) {

            if (hour < thisHour24) {
                hourSpan.className = "hourSpan";
            } else if (hour > thisHour24) {
                hourSpan.className = "hourSpan";
            } else {
                hourSpan.className += " " + "currentHour";
                hourSpan.textContent = currentHour;
                currentHourTest = true;
            };
        };


        let icon = ".save";
        let icons = document.querySelectorAll(icon);
        icons.forEach(function(icon) {
            icon.addEventListener("click", function(event) {
                event.preventDefault();
                const targetIcon = event.target;

                let index = targetIcon.getAttribute("save-Id");

                let plannerInput = document.querySelector('#input-' + index);
                let value = plannerInput.value;

                plansArray[index] = value;

                document.querySelector("#saveId-" + index).classList.remove("flashingSaveThis");
                localStorage.setItem("storedPlanner", JSON.stringify(plansArray));
            });
        })


        let input = ".plannerInput";
        let inputs = document.querySelectorAll(input)

        inputs.forEach(function(input) {
            input.addEventListener('change', function(event) {
                event.preventDefault();
                const targetInput = event.target;

                let x = targetInput.getAttribute("hour-value");

                document.querySelector("#saveId-" + x).classList.add("flashingSaveThis");
            });
        });


        updateTime();

        function updateTime() {
            var fancyDate = DateTime.local().toFormat('DDDD -') + DateTime.local().toFormat(' ttt');

            let dateTimeSubtitle = document.querySelector('#navbar-subtitle');
            dateTimeSubtitle.textContent = fancyDate;

            if (currentHourTest) {
                let currentHour = DateTime.local().toFormat('tt');
                let currentHourSpan = document.querySelector('.currentHour')
                currentHourSpan.textContent = currentHour;
            };
        };
        setInterval(updateTime, 1000);



        everyHourOnTheHour();

        function everyHourOnTheHour() {

            var mins = DateTime.local().toFormat('mm' + 'ss');
            if (mins == "0000") {
                resetPlanner();
            };
        };
        setInterval(everyHourOnTheHour, 1000);
    };
});