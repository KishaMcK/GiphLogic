$(document).ready(function () {
    //create an array of logics
    var logics = ["yes", "never", "yum", "omg", "again?", "not cool", "i got this", "you're not alone", "i love you", "merry christmas", "yea buddy", "i cant"];
    //function for displaying data//
    function renderButtons() {
        $("#logicView").empty();

        for (var i = 0; i < logics.length; i++) {
            var a = $("button");
            a.addClass("logic");
            a.attr("data-name", logics[i]);
            a.text(logics[i]);
            $("logicView").prepend(a);
        }
    }

    //function button event//
    $("addLogic").on("click", function () {
        event.preventDefault();

        var logicInput = $("#logicInput").val().trim();
        logics.push(logicInput);
        renderButtons();
        $("#logicInput").val("");
    });

}