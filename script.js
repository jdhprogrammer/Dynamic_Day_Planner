let DateTime = luxon.DateTime;

$(document).ready(function() {

    let date = new Date();
    let now = DateTime.local();
    let fancyDate = DateTime.local().toFormat('ffff');

    // let nowHour24 = DateTime.local().toFormat('H');
    // let nowHour12 = DateTime.local().toFormat('h');

    // if (test) {
    //     nowHour24 = 13;
    //     nowHour12 = 1;
    // }
    console.log(date);
    console.log(now)
    console.log(now.hour);
    console.log(fancyDate);

    updateTime();

    function updateTime() {
        var fancyDate = DateTime.local().toFormat('DDDD -') + DateTime.local().toFormat(' ttt');

        let dateTimeSubtitle = document.querySelector('#navbar-subtitle');
        dateTimeSubtitle.textContent = fancyDate;
    }
    setInterval(updateTime, 1000);


    for (let hour = 9; hour <= 17; hour++) {
        const i = hour - 9;

        let newRow = document.createElement("div")
        newRow.setAttribute
    }
});