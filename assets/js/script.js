// variables using moment.js to get both the current date and time
var date = moment().format('dddd,   MMMM Do, YYYY  ');
var timeNow = moment().format('h:mm:ss a');

$("#currentDay").text("Current date and time: " + date + timeNow);

// List of hours to include on schedule - added extra hours so I could see if colors were working - originally stopped at 5pm
var hourList = [
    { time: "9 AM", event: "" },
    { time: "10 AM", event: "" },
    { time: "11 AM", event: "" },
    { time: "12 PM", event: "" },
    { time: "1 PM", event: "" },
    { time: "2 PM", event: "" },
    { time: "3 PM", event: "" },
    { time: "4 PM", event: "" },
    { time: "5 PM", event: "" },
    { time: "6 PM", event: "" },
    { time: "7 PM", event: "" },
    { time: "8 PM", event: "" },
];



// Set up color of row using classes provided in starter code CSS
function setColor(time) {
    var currentTask = moment(timeNow, "H A");
    var tenseAssigned = moment (time, "H A");
    if (currentTask.isBefore(tenseAssigned) === true) {
        return "future";
    } else if (currentTask.isAfter(tenseAssigned) === true) {
        return "past";
    }else {
        return "present";
    }
}

setColor();

// get saved tasks from local storage if there are any - must be listed above row creation in order to populate saved tasks
var previousTask = JSON.parse(localStorage.getItem("storeTask"));
if (previousTask) {
    hourList = previousTask;
}

// create a row for every line listed in the array, listing the time for each. Setting a row color based on the past/present/future assignment in preceding setColor function. The rows were appended to the container provided in starter code.
hourList.forEach(function (createRow, index) {
    var hourAssigned = createRow.time;
    var rowColor = setColor(hourAssigned);
    var row =
    "<div class='time-block' id='" + index + "'><div class='row no-gutters input-group'><div class='col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3'>" + hourAssigned + "</div><textarea class='form-control " + rowColor + "'>" + createRow.event + "</textarea><div class='col-sm col-lg-1 input-group-append'><button class='saveBtn btn-block' type='submit'><i class='fas fa-save'></i></butto></div></div></div>";
    $(".container").append(row);
});

// Save button event listener
$(".saveBtn").on("click", function() {
    var taskSave = parseInt(
        $(this)
        .closest(".time-block")
        .attr("id")
    );
    var taskEntry = $.trim(
        $(this)
        .parent()
        .siblings("textarea")
        .val()
    );
    hourList[taskSave].event = taskEntry;


localStorage.setItem("storeTask", JSON.stringify(hourList));
});

